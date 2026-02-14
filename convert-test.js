import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputPath = path.join(process.cwd(), "public/media/logo.png");
const outputPath = path.join(process.cwd(), "public/media/logo.webp");

async function convert() {
  console.log(`Converting: ${inputPath}`);

  try {
    const info = await sharp(inputPath)
      .webp({ quality: 80 }) // 80% quality is a good balance
      .toFile(outputPath);

    const originalSize = fs.statSync(inputPath).size / 1024;
    const newSize = info.size / 1024;
    const reduction = ((originalSize - newSize) / originalSize) * 100;

    console.log("--------------------------------------------------");
    console.log(`✅ Conversion Complete!`);
    console.log(`Original Size: ${originalSize.toFixed(2)} KB`);
    console.log(`WebP Size:     ${newSize.toFixed(2)} KB`);
    console.log(`Savings:       ${reduction.toFixed(2)}%`);
    console.log("--------------------------------------------------");
  } catch (err) {
    console.error("Error converting file:", err);
  }
}

convert();
