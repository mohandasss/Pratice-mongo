import { Router } from 'express';
import { userLogin, userRegister } from '../controllers/userLogin.controller';

const authRouter = Router()




authRouter.post("/register",userRegister)
authRouter.post("/login",userLogin)
// authRouter.get('/get-api', userAuth , getAllController)



export default authRouter