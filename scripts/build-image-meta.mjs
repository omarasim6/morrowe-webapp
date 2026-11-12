// Generates lib/image-meta.json (width, height, tiny blur placeholder) for every product scene.
// Run: node scripts/build-image-meta.mjs   (needs `sharp`, already a dependency)
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'public/products');
const out = {};
for (const slug of fs.readdirSync(dir).sort()) {
  const f = path.join(dir, slug, 'scene.png');
  if (!fs.existsSync(f)) continue;
  const img = sharp(f); const { width, height } = await img.metadata();
  const buf = await img.resize(16).jpeg({ quality: 60 }).toBuffer();
  out[`/products/${slug}/scene.png`] = { w: width, h: height, blur: 'data:image/jpeg;base64,' + buf.toString('base64') };
}
fs.writeFileSync(path.join(root, 'lib/image-meta.json'), JSON.stringify(out, null, 1) + '\n');
console.log('wrote lib/image-meta.json', Object.keys(out).length, 'images');
