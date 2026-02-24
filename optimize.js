import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PORTFOLIO_DIR = path.join(process.cwd(), 'client/public/portfolio');

async function optimizeImages() {
    const files = fs.readdirSync(PORTFOLIO_DIR).filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg'));
    console.log(`Found ${files.length} images to optimize...`);

    let totalSaved = 0;

    for (const file of files) {
        const filePath = path.join(PORTFOLIO_DIR, file);
        const parsed = path.parse(file);
        const webpPath = path.join(PORTFOLIO_DIR, `${parsed.name}.webp`);

        // Skip if webp already exists
        // if (fs.existsSync(webpPath)) continue;

        const originalSize = fs.statSync(filePath).size;

        try {
            await sharp(filePath)
                .resize({ width: 1600, withoutEnlargement: true }) // Fast responsive sizing avoiding giant images
                .webp({ quality: 80 })
                .toFile(webpPath);

            const newSize = fs.statSync(webpPath).size;
            const saved = Math.max(0, originalSize - newSize);
            totalSaved += saved;

            console.log(`Optimized ${file} -> ${parsed.name}.webp | Saved: ${(saved / 1024 / 1024).toFixed(2)} MB`);

            // Delete the original to save space
            fs.unlinkSync(filePath);
        } catch (err) {
            console.error(`Failed to optimize ${file}:`, err);
        }
    }

    console.log(`Optimization complete! Total space saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
}

optimizeImages();
