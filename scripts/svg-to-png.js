#!/usr/bin/env node
// Usage: node scripts/svg-to-png.js [pattern]
// Example: node scripts/svg-to-png.js "public/charts/*-20261008.svg"
//          node scripts/svg-to-png.js  (converts all SVG in public/charts/)

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const pattern = process.argv[2] || 'public/charts/*.svg';

const files = glob.sync(pattern);
if (!files.length) {
  console.log('No SVG files matched:', pattern);
  process.exit(0);
}

let done = 0;
files.forEach(file => {
  const out = file.replace(/\.svg$/, '.png');
  sharp(file)
    .png()
    .toFile(out, (err, info) => {
      if (err) console.error(`✗ ${path.basename(file)}: ${err.message}`);
      else console.log(`✓ ${path.basename(out)} ${info.width}×${info.height} ${Math.round(info.size/1024)}KB`);
      if (++done === files.length) console.log(`\nDone: ${done} files`);
    });
});
