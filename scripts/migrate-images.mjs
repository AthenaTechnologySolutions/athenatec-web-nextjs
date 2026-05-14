import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGE_LIST_FILE = "image-urls.txt";
const OUTPUT_DIR = "public/assets/Clients/";
const MAX_WIDTH = 1200;
const QUALITY = 80;

async function downloadAndConvert(url, index) {
  const outputFile = path.join(
    OUTPUT_DIR,
    `let-connect${String(index + 1).padStart(2, "0")}.webp`,
  );

  console.log(`Downloading [${index + 1}] ${url}`);

  const response = await fetch(url, {
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Download failed with ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());

  await sharp(buffer)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outputFile);

  console.log(`Saved: ${outputFile}`);
}

async function run() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const contents = await fs.readFile(IMAGE_LIST_FILE, "utf-8");
  const urls = contents
    .split("\n")
    .map((url) => url.trim())
    .filter(Boolean);

  console.log(`Total images found: ${urls.length}\n`);

  for (const [index, url] of urls.entries()) {
    try {
      await downloadAndConvert(url, index);
    } catch (error) {
      console.error(`Failed: ${url}`);
      console.error(error instanceof Error ? error.message : error);
    }
  }

  console.log("\nAll images processed.");
}

void run();
