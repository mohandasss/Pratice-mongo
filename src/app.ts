import express from "express";
import userRoutes from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server Running");
});

app.use("/",userRoutes)
app.use("/",postRouter)

export default app;