import { Router } from "express";
import { addPost, getAllPosts } from "../controllers/posts.controller";
const postRouter = Router()

postRouter.post("/add-post" , addPost)
postRouter.get("/posts" , getAllPosts)

export default postRouter
