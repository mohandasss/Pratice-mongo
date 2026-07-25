import { createClient } from "redis";


const redisClient = createClient({
    url: "redis://localhost:6379",
}) 


redisClient.on("connect", () => {
    console.log("Redis client connected");
})

redisClient.on("error", (error) => {
    console.log(error);
})




export default redisClient