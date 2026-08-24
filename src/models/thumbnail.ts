import mongoose from "mongoose";

const thumbnailSchema = new mongoose.Schema({
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    required: true,
  },
  blur_image: {
    type: String,
  },
});

const thumbnail = mongoose.model("thumbnail", thumbnailSchema);
export default thumbnail;
