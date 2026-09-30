/**
 * 사이트 로고 PNG — public/logo.png 를 파비콘·PWA 크기로 다시 뽑는다.
 * Usage: node scripts/gen-logo-icons.mjs
 */
import { createCanvas, loadImage } from "@napi-rs/canvas";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const img = await loadImage(join(root, "public/logo.png"));

function render(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, size, size);
  return canvas.toBuffer("image/png");
}

const outputs = [
  ["app/icon.png", 512],
  ["app/apple-icon.png", 180],
  ["public/icons/icon-192.png", 192],
  ["public/icons/icon-512.png", 512],
];

for (const [rel, size] of outputs) {
  writeFileSync(join(root, rel), render(size));
  console.log("wrote", rel, size);
}
