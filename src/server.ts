import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import redisClient from "./config/redis";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("1. Before MongoDB");
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("2. MongoDB Connected");
    console.log("3. Redis isOpen:", redisClient.isOpen);
    console.log("4. Redis isReady:", redisClient.isReady);

    // await redisClient.connect();

    console.log("5. Redis Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
