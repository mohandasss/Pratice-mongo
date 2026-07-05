import { Router } from "express";
import { Adduser, getAllUsers, deleteUser, updateuser } from "../controllers/getAllUsers.controller";

const userRoutes = Router()



userRoutes.get("/users", getAllUsers)
userRoutes.post("/add-user", Adduser)
userRoutes.patch("/update-user/:id",updateuser)
userRoutes.delete("/delete/:id" , deleteUser)



export default userRoutes