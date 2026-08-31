import express from "express";
import authControllers from "./auth.controllers.js";
import { tokenVerify } from "../../middlewares/tokenVerify.js";


const router = express.Router();

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);
router.get('/getUserToken',tokenVerify, authControllers.getUserToken);
router.put('/changePass', tokenVerify, authControllers.changePass)


export default router;