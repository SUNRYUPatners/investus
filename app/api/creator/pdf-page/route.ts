import { NextRequest } from "next/server";
import path from "path";
import { getAdminSupabase, getUserFromRequest } from "@/lib/supabase";

export const dynamic = "force-dynamic";
// Extend timeout for PDF rendering (default 300s on Vercel)
export const maxDuration = 60;

const BUCKET = "creator-pdfs";
const SCALE = 1.8; // render quality (higher = sharper but slower)

export async function GET(req: NextRequest) {
  const authUser = await getUserFromRequest(req);
  if (!authUser) return new Response("Unauthorized", { status: 401 });

  const url = new URL(req.url);
  const pdfPath = url.searchParams.get("path");
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1", 10));

  if (!pdfPath) return new Response("No path", { status: 400 });

  // Download PDF bytes from Supabase
  const supabase = getAdminSupabase();
  const { data, error } = await supabase.storage.from(BUCKET).download(pdfPath);
  if (error || !data) {
    console.error("[pdf-page] download error:", error?.message);
    return new Response("Not found", { status: 404 });
  }

  const arrayBuffer = await data.arrayBuffer();
  const pdfData = new Uint8Array(arrayBuffer);

  // Server-side pdfjs — fake-worker mode (no browser Web Worker)
  // Must import worker module with a static path so Vercel bundler includes it,
  // then expose via globalThis.pdfjsWorker so pdfjs skips the dynamic import("./pdf.worker.mjs")
  // that fails at runtime in a bundled serverless environment.
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs" as never) as typeof import("pdfjs-dist");
  const pdfjsWorker = await import("pdfjs-dist/legacy/build/pdf.worker.mjs" as never);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).pdfjsWorker = pdfjsWorker;

  const { createCanvas } = await import("@napi-rs/canvas");

  // CMap files: absolute filesystem path (NO file:// prefix).
  // pdfjs v6 NodeBinaryDataFactory calls fs.readFile(url) with the string directly —
  // fs.readFile rejects "file://" strings (needs a URL object); plain paths work fine.
  // public/pdfjs-cmaps is guaranteed in the Vercel bundle; node_modules data files may be stripped.
  const cMapUrl = path.join(process.cwd(), "public/pdfjs-cmaps") + "/";
  const standardFontDataUrl = path.join(process.cwd(), "node_modules/pdfjs-dist/standard_fonts") + "/";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const docParams: any = {
    data: pdfData,
    cMapUrl,
    cMapPacked: true,
    standardFontDataUrl,
    useSystemFonts: false,
    isEvalSupported: false,
    canvasFactory: {
      create(width: number, height: number) {
        const canvas = createCanvas(width, height);
        return { canvas, context: canvas.getContext("2d") };
      },
      reset(pair: { canvas: ReturnType<typeof createCanvas> }, w: number, h: number) {
        pair.canvas.width = w;
        pair.canvas.height = h;
      },
      destroy(pair: { canvas: ReturnType<typeof createCanvas> }) {
        pair.canvas.width = 0;
        pair.canvas.height = 0;
      },
    },
  };
  const doc = await getDocument(docParams).promise;

  const numPages = doc.numPages;
  if (page > numPages)
    return new Response("Page out of range", { status: 400 });

  const pdfPage = await doc.getPage(page);
  const viewport = pdfPage.getViewport({ scale: SCALE });
  const canvas = createCanvas(viewport.width, viewport.height);
  const ctx = canvas.getContext("2d");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await pdfPage.render({ canvasContext: ctx as any, canvas: canvas as any, viewport }).promise;

  // Encode as JPEG for small payload (quality 88)
  const imageBuffer = await canvas.encode("jpeg", 88);
  // Slice to exact range so the ArrayBuffer matches the buffer content
  const body = imageBuffer.buffer.slice(imageBuffer.byteOffset, imageBuffer.byteOffset + imageBuffer.byteLength);

  return new Response(body as BodyInit, {
    headers: {
      "Content-Type": "image/jpeg",
      "X-Total-Pages": String(numPages),
      "Cache-Control": "private, max-age=3600",
    },
  });
}
