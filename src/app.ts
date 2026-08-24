import express from "express";
import userRoutes from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import addressRouter from "./routes/addressRoutes";
import authRouter from "./routes/authRoutes";
import companyRouter from "./routes/companyRouter";
import morgan from "morgan";
const app = express();


app.use(morgan("dev"));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/", userRoutes);
app.use("/", postRouter);
app.use("/", addressRouter);
app.use("/auth", authRouter);
app.use("/company", companyRouter);

export default app;
