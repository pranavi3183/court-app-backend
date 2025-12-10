import express from "express";
import { createBooking, getBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.get("/", getBookings);
router.post("/", createBooking);

export default router;
