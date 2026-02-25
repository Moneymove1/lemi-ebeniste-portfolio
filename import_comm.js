import sharp from 'sharp';

const files = [
  { in: "/Users/lukasmacbookpro/.gemini/antigravity/brain/5d86a008-6c24-4af6-bedb-07908cecdced/media__1772003729823.jpg", out: "client/public/portfolio/comm_1.webp" },
  { in: "/Users/lukasmacbookpro/.gemini/antigravity/brain/5d86a008-6c24-4af6-bedb-07908cecdced/media__1772003729838.jpg", out: "client/public/portfolio/comm_2.webp" },
  { in: "/Users/lukasmacbookpro/.gemini/antigravity/brain/5d86a008-6c24-4af6-bedb-07908cecdced/media__1772003879944.jpg", out: "client/public/portfolio/comm_3.webp" },
  { in: "/Users/lukasmacbookpro/.gemini/antigravity/brain/5d86a008-6c24-4af6-bedb-07908cecdced/media__1772003899597.jpg", out: "client/public/portfolio/comm_4.webp" },
  { in: "/Users/lukasmacbookpro/.gemini/antigravity/brain/5d86a008-6c24-4af6-bedb-07908cecdced/media__1772003901399.jpg", out: "client/public/portfolio/comm_5.webp" },
];

async function run() {
  for (const f of files) {
    await sharp(f.in).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toFile(f.out);
    console.log("Written", f.out);
  }
}
run();
