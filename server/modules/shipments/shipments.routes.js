import express from "express";
import shipmentsControllers from "./shipments.controllers.js";
import { tokenVerify } from "../../middlewares/tokenVerify.js";


const router = express()

router.post('/createShipment',tokenVerify, shipmentsControllers.createShipment)
router.get('/', tokenVerify, shipmentsControllers.getShipments)

export default router;