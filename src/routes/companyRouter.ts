import { Router } from "express";
import { addCompanyLogo } from "../controllers/company.controller";
import upload from "../middlewares/upload";

const companyRouter = Router()



companyRouter.post('/logo' ,  upload.single('logo') , addCompanyLogo)


export default companyRouter