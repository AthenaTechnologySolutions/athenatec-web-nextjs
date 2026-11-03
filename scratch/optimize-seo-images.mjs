/* Throwaway asset optimization for the images reported by the SEO audit. */
import sharp from "sharp";

const assets = [
  {
    input: "public/assets/images/mary.png",
    output: "public/assets/images/mary.webp",
  },
  {
    input: "public/assets/images/portugal-announcement.png",
    output: "public/assets/images/portugal-announcement.webp",
  },
];

for (const asset of assets) {
  await sharp(asset.input)
    .rotate()
    .webp({ quality: 86, smartSubsample: true })
    .toFile(asset.output);
  console.log(`Wrote ${asset.output}`);
}
