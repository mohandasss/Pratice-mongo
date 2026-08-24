import company from "../models/companySchema";
import { sendResponse } from "../utils/apiResponse";
import { RequestResponse } from "../utils/globalType";
import { thumbnailQueue } from "../queue/thumbnailQueue";
import { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/uploadToCloudinary";
export const addCompanyLogo = async (req: Request, res: Response) => {
  console.log("logger==>", req.file);
  const { name } = req.body;
  const fileBuffer = req.file?.buffer;

  if (!name || !fileBuffer) {
    return sendResponse(res, 400, false, "Name and logo are required", null);
  }

  
  try {
    console.log('beforeee')
    const cloudinaryUrl = await uploadToCloudinary(fileBuffer);
    console.log('afterrr')
    const response = await company.create({
      name,
      logo: cloudinaryUrl,
    });

    await thumbnailQueue.add("generateThumbnail", {
      logo: response.logo,
      companyId: response._id,
    });

    return sendResponse(
      res,
      201,
      true,
      "Company logo added successfully",
      response,
    );
  } catch (err) {
    return sendResponse(
      res,
      500,
      false,
      "Error adding company logo",
      err instanceof Error ? err.message : err,
    );
  }
};
