import express from "express";
import userRoutes from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import addressRouter from "./routes/addressRoutes";
import authRouter from "./routes/authRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server Running");
});

app.use("/", userRoutes)
app.use("/", postRouter)
app.use("/", addressRouter)
app.use("/auth",authRouter)

export default app;