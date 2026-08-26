import { Worker } from "bullmq";
import { imageProcessing } from "../utils/imageProcessing";
import thumbnail from "../models/thumbnail";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
import redisClient from "../config/redis";
const thumbnailWorker = new Worker(
  "thumbnailQueue",
  async (job) => {
    const { imageBuffer, companyId } = job.data;

    if (job.name !== "generateThumbnail") {
      throw new Error(`Unknown thumbnail job: ${job.name}`);
    }

    try {
      const originalImage = Buffer.from(imageBuffer, "base64");
      const processedImage = await imageProcessing(originalImage);

      const uploadedBlurImage = await uploadToCloudinary(processedImage);

      await thumbnail.create({
        company_id: companyId,
        blur_image: uploadedBlurImage,
      });
    } catch (error) {
      console.error(`Thumbnail job ${job.id} failed:`, error);
      throw error;
    }
  },
  {
    connection: redisClient,
  },
);

thumbnailWorker.on("completed", () => {
  console.log("its perfetrcly working==>");
});

thumbnailWorker.on("failed", () => {
  console.log("its perfetrcly not  working==>");
});

export default thumbnailWorker;
