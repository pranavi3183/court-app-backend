import express from "express";
import { getRules, addRule } from "../controllers/pricingController.js";

const router = express.Router();

router.get("/", getRules);
router.post("/admin", addRule);

export default router;
