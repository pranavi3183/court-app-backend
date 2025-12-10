import db from "../../db/database.js";
import { isAvailable } from "../services/availabilityService.js";
import { calculatePrice } from "../utils/priceEngine.js";

export const getBookings = (req, res) => {
    const rows = db.prepare("SELECT * FROM bookings").all();
    res.json(rows);
};

export const createBooking = (req, res) => {
    const { userName, courtId, coachId, rackets, shoes, startTime, endTime } = req.body;

    // 1. Check Availability
    const available = isAvailable(courtId, coachId, rackets, startTime, endTime);
    if (!available.ok) return res.status(400).json({ error: available.message });

    // 2. Pricing
    const price = calculatePrice(startTime, courtId);

    // 3. Save booking
    const stmt = db.prepare(`
        INSERT INTO bookings 
        (userName, courtId, coachId, rackets, shoes, startTime, endTime, price)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
        userName,
        courtId,
        coachId || null,
        rackets,
        shoes,
        startTime,
        endTime,
        price
    );

    res.json({ id: result.lastInsertRowid, price });
};
