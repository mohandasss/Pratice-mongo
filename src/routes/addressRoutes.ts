import { Router } from "express";
import { addAddress, getAddress } from "../controllers/address.controller";
const addressRouter = Router()

addressRouter.post("/add-address", addAddress)
addressRouter.get("/get-address", getAddress)

export default addressRouter
