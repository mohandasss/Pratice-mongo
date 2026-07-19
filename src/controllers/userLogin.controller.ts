import { Request, Response } from "express"
import User from "../models/userSchema"
import { sendResponse } from "../utils/apiResponse"
import { createUserSchema } from "../validations/validators"



export const userRegister = async (req: Request, res: Response) => {
    try {

        const { name, email, phone, password } = req.body;
        const { houseno, landmark, city, state, pincode } = req.body.address;

        // const result = createUserSchema.safeParse(req.body)


        // if (!result.success) {
        //     return sendResponse(res, 400, false, "Please provide all the fields", result.error)
        // }
        console.log(req.body)
        const user = await User.create({
            name,
            email,
            phone,
            password,
            address: {
                houseNo: houseno,
                landmark,
                city,
                state,
                pincode,
            }
        });
        console.log(req.body)

        return sendResponse(res, 201, true, "User added successfully", user)

    } catch (error) {
        console.error("Error in userRegister:", error);
        return sendResponse(res, 500, false, "Error adding user", error instanceof Error ? error.message : error)
    }
}










export const userLogin = async (req: Request, res: Response) => {

    const { email, password } = req.body

    try {


        const isExist = await User.findOne({ email })
        if (!isExist) {
            return sendResponse(res, 404, false, "User not found", { email })
        }


        const isPasswordvalid = await isExist.isPasswordValid(password)
        if (!isPasswordvalid) {
            return sendResponse(res, 401, false, "Invalid password", null)
        }
        // return sendResponse(res, 200, true, "User logged in successfully", isExist)









    } catch (error) {

    }


}



