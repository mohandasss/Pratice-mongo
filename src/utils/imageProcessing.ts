import sharp from "sharp";
export const imageProcessing = async (imageBuffer: Buffer) => {
  const processedImage = await sharp(imageBuffer)
    .blur(5)
    .jpeg({ quality: 70 })
    .toBuffer();
  return processedImage;
};
