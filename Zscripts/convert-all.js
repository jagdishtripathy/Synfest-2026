import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.join(process.cwd(), "public/media");
const outputPath = path.join(process.cwd(), "public/media");

async function convertAll() {
  console.log(`📂 Scanning: ${directoryPath}`);

  try {
    if (!fs.existsSync(directoryPath)) {
      console.error(`❌ Directory not found: ${directoryPath}`);
      return;
    }

    const files = fs.readdirSync(directoryPath);
    let savedKB = 0;
    let count = 0;

    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if ([".jpg", ".jpeg", ".png"].includes(ext)) {
        const inputPath = path.join(directoryPath, file);
        const outputFilePath = path.join(
          outputPath,
          path.basename(file, ext) + ".webp",
        );

        // Skip if webp already exists (optional, but good for re-runs)
        if (fs.existsSync(outputFilePath)) continue;

        const originalSize = fs.statSync(inputPath).size / 1024;

        try {
          const info = await sharp(inputPath)
            .webp({ quality: 80, effort: 6 }) // effort: 6 (max) for best compression/quality ratio
            .toFile(outputFilePath);

          const newSize = info.size / 1024;
          const reduction = originalSize - newSize;
          savedKB += reduction;
          count++;

          console.log(
            `✅ ${file.padEnd(30)} -> ${path.basename(outputFilePath)} | ${originalSize.toFixed(1)}KB -> ${newSize.toFixed(1)}KB (${Math.round((reduction / originalSize) * 100)}% saved)`,
          );
        } catch (err) {
          console.error(`❌ Error converting ${file}:`, err.message);
        }
      }
    }

    console.log("--------------------------------------------------");
    console.log(`🎉 Processed ${count} images.`);
    console.log(
      `💾 Total Space Saved: ${savedKB.toFixed(2)} KB (${(savedKB / 1024).toFixed(2)} MB)`,
    );
    console.log("--------------------------------------------------");
  } catch (err) {
    console.error("Directory read error:", err);
  }
}

convertAll();
