import { Request, Response } from "express";
import posts from "../models/postSchema";
import { sendResponse } from "../utils/apiResponse";


export const addPost = async (req: Request, res: Response) => {
    const { userId, title, content } = req.body;

    try {
        const postAdded = await posts.create({
            user: userId,
            title,
            content
        })
        if (!postAdded) {
            return sendResponse(res, 400, false, "Error adding post")
        }
        return sendResponse(res, 201, true, "Post added successfully", postAdded)
    } catch (error) {
        return sendResponse(res, 500, false, "Error adding post")
    }





}



export const getAllPosts = async (req: Request, res: Response) => {

    try {
        const userPosts = await posts.find().populate("user", "name email")
        if (!userPosts) {
            return sendResponse(res, 404, false, "No posts found")
        }
        return sendResponse(res, 200, true, "Posts fetched successfully", userPosts)
    } catch (error) {
        return sendResponse(res, 500, false, "Error fetching posts")
    }



} 


