import express from "express";
import { tokenVerify } from "../../middlewares/tokenVerify.js";
import userControllers from "./user.controllers.js";


const router = express();

router.get('/getUserToken',tokenVerify, userControllers.getUserToken);



export default router;