/**
 * Stamps a unique build timestamp into public/sw.js so the browser detects
 * a changed service-worker file on every Vercel deployment and triggers an update.
 */
const fs   = require("fs");
const path = require("path");

const swPath  = path.join(__dirname, "../public/sw.js");
let   content = fs.readFileSync(swPath, "utf8");

// Replace whatever version string is in the CACHE constant
const stamp   = Date.now();
content       = content.replace(/const CACHE = "investus-v[\w-]+";/, `const CACHE = "investus-v${stamp}";`);

fs.writeFileSync(swPath, content);
console.log(`[update-sw-version] CACHE = investus-v${stamp}`);
