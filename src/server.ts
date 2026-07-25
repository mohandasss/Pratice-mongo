import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import User from "./models/userSchema";
import redisClient from "./config/redis";

dotenv.config();

const PORT = process.env.PORT || 5000;





const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("✅ MongoDB Connected");

    await redisClient.connect();
    console.log("✅ Redis Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
