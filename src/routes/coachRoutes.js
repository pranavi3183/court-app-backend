import express from "express";
import { getCoaches } from "../controllers/coachController.js";

const router = express.Router();
router.get("/", getCoaches);
export default router;
