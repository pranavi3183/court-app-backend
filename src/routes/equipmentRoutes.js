import express from "express";
import { getEquipment } from "../controllers/equipmentController.js";

const router = express.Router();
router.get("/", getEquipment);

export default router;
