// Converts the raw marketing assets in /resources into web-optimized JPEGs.
// next/image then serves AVIF/WebP variants automatically at request time.
import sharp from "sharp";
import path from "node:path";

const SRC = "resources";
const OUT = "public/images";

const map = [
  ["B8422E8F-DDE0-4D9E-85D2-5F35AC6A48DE.PNG", "hero-desktop.jpg", 2000],
  ["8106A8F4-4A19-48A8-B8E1-57F383596387.PNG", "hero-mobile.jpg", 1024],
  ["E3E81A82-4C46-4D3D-BECB-ED4DADFC66B7.PNG", "angela-portrait.jpg", 1800],
  ["9C092AD6-8FAE-4B1F-998E-6295DF8565A1.PNG", "listing-sable-creek.jpg", 1800],
  ["940BD331-B7D8-4A4D-A05E-218BFD151438.PNG", "listing-whitewing.jpg", 1448],
  ["B944A91B-B906-4818-878B-8F71EFE777B1.PNG", "listing-dasmarinas.jpg", 1800],
  ["8404D7F2-152F-447F-955E-7C74DBB684C4.PNG", "lifestyle-bayfront.jpg", 2000],
  ["6EFBCE71-5B0A-4A20-AF33-9E2F24EE73D3.PNG", "lifestyle-patio.jpg", 1800],
  ["0FC1A09B-137C-4CA5-AB83-F7680FC80F8C.PNG", "lifestyle-pool.jpg", 1800],
  ["BEA4F378-5E3E-4531-90E4-608CF9558A2B.PNG", "lifestyle-firepit.jpg", 1800],
];

for (const [src, out, width] of map) {
  const info = await sharp(path.join(SRC, src))
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(path.join(OUT, out));
  console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}KB`);
}
