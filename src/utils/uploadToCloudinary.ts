import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = (
  fileBuffer: Buffer,
): Promise<string> =>   
  new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "company-logos",
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload returned no result"));
          return;
        }

        resolve(result.secure_url);
      },
    );

    uploadStream.on("error", reject);
    uploadStream.end(fileBuffer);
  });
