/**
 * PWA / favicon PNG — 네이비 배경 + 골드 차트 화살표
 * Usage: node scripts/gen-logo-icons.mjs
 */
import { createCanvas } from "@napi-rs/canvas";
import { writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const NAVY = "#1a365d";
const GOLD = "#b38f38";
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function drawLogo(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  const pad = size * 0.08;
  const r = size * 0.2;

  ctx.fillStyle = NAVY;
  roundRect(ctx, pad, pad, size - pad * 2, size - pad * 2, r);
  ctx.fill();

  ctx.strokeStyle = GOLD;
  ctx.lineWidth = Math.max(2, size * 0.045);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const s = (size - pad * 2) / 24;
  const ox = pad;
  const oy = pad;

  ctx.beginPath();
  ctx.moveTo(ox + 3 * s, oy + 17 * s);
  ctx.lineTo(ox + 9 * s, oy + 11 * s);
  ctx.lineTo(ox + 13 * s, oy + 15 * s);
  ctx.lineTo(ox + 21 * s, oy + 7 * s);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(ox + 15 * s, oy + 7 * s);
  ctx.lineTo(ox + 21 * s, oy + 7 * s);
  ctx.lineTo(ox + 21 * s, oy + 13 * s);
  ctx.stroke();

  return canvas.toBuffer("image/png");
}

const outputs = [
  ["app/icon.png", 512],
  ["app/apple-icon.png", 180],
  ["public/icons/icon-192.png", 192],
  ["public/icons/icon-512.png", 512],
];

for (const [rel, size] of outputs) {
  const out = join(root, rel);
  writeFileSync(out, drawLogo(size));
  console.log("wrote", rel, size);
}
