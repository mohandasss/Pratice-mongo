import { Queue } from "bullmq";
import redisClient from "../config/redis";


export const thumbnailQueue = new Queue('thumbnailQueue',{
    connection: redisClient
})