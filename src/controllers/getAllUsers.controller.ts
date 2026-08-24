import { Request, Response } from "express"
import { sendResponse } from "../utils/apiResponse"
import { createUserSchema } from "../validations/validators"
import User from "../models/userSchema"
import redisClient from "../config/redis"



//get all users
export const getAllUsers = async (req: Request, res: Response) => {

    try {
        const cacheResponse = await redisClient.get(`allusers`)

        if (cacheResponse) {
            const response = JSON.parse(cacheResponse || '{}')
            return sendResponse(res, 200, true, "Users fetched successfully from cache", response)
        }
        const allUsers = await User.find()
        
        if (!allUsers) {
            return sendResponse(res, 404, false, "No users found")
        }


        await redisClient.set(`allusers`, JSON.stringify(allUsers))

        return sendResponse(res, 200, true, "Users fetched successfully", allUsers)
    } catch (error) {
        console.log(error)
        return sendResponse(res, 500, false, "error")
    }


}





//add users




//update user
export const updateuser = async (req: Request, res: Response) => {


    const { id } = req.params
    const updateData = req.body

    if (!id) {
        return sendResponse(res, 400, false, "Id is required")
    }

    try {

        const updatedUser = await User.findByIdAndUpdate(id, updateData,
            {
                new: true,
                runValidators: true
            }
        ).select("name email  phone")

        if (!updatedUser) {
            return sendResponse(res, 404, false, "User not found")
        }

        await redisClient.del(`allusers`)
        return sendResponse(res, 200, true, "User updated successfully", updatedUser)





    } catch (error) {

    }



}

//delete user
export const deleteUser = async (req: Request, res: Response) => {
    console.log("delete user called")
    const { id } = req.params

    if (!id) {
        return sendResponse(res, 404, false, "No users Id found")
    }

    try {

        const response = await User.findByIdAndDelete(id).select("name email  phone")
        if (!response) {
            return sendResponse(res, 400, true, "please provide proper user id")
        }
        await redisClient.del(`allusers`)
        return sendResponse(res, 200, true, "User Deleted successfully", null)



    } catch (error) {

    }


}