// src/routes/equipmentRoutes.js
import express from "express";
import {
  getEquipment,
  getAvailability,
  upsertEquipmentForCourt
} from "../controllers/equipmentController.js";

const router = express.Router();

router.get("/", getEquipment); // list all equipment_per_court rows
router.get("/availability", getAvailability); // ?courtId=&start=&end=
router.post("/admin", upsertEquipmentForCourt); // admin create/update totals

export default router;
