import { Request, Response } from "express";
import address from "../models/addressSchema";
import { sendResponse } from "../utils/apiResponse";
import User from "../models/userSchema";

export const addAddress = async (req: Request, res: Response) => {

    try {
        const response = await address.create({
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            user: req.body.user
        })

        if (!response) {
            return sendResponse(res, 500, false, "Failed to add address", response)
        }

        return sendResponse(res, 200, true, "Address Added Successfully", response)
    } catch (error) {
        return sendResponse(res, 500, false, "Failed to add address", error)
    }




}

export const getAddress = async (req: Request, res: Response) => {

    const userId = req.body.id;
    //console.log(userId)


    try {
        const userAddress = await User.find(userId)
        //console.log("userAddress", userAddress)


        return sendResponse(res, 200, true, "Address Fetched Successfully", userAddress)
    } catch (error) {
        return sendResponse(res, 500, false, "Failed to fetch address", error)
    }


}   