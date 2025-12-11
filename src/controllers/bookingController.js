import db from "../../db/database.js";
import { isAvailable } from "../services/availabilityService.js";
import { calculatePrice } from "../utils/priceEngine.js";

export const getBookings = (req, res) => {
    const rows = db.prepare("SELECT * FROM bookings").all();
    res.json(rows);
};

export const createBooking = (req, res) => {
  const { userName, courtId, coachId, rackets, shoes, startTime, endTime } = req.body;
  // ensure ISO strings
  const start = new Date(startTime).toISOString();
  const end = new Date(endTime).toISOString();

  const insertTx = db.transaction((payload) => {
    const check = isAvailable(payload.courtId, payload.coachId, payload.rackets, payload.shoes, payload.startTime, payload.endTime);
    if (!check.ok) throw new Error(check.message);

    const price = calculatePrice(payload.startTime, payload.courtId);

    const stmt = db.prepare(`
      INSERT INTO bookings 
      (userName, courtId, coachId, rackets, shoes, startTime, endTime, price)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const info = stmt.run(
      payload.userName,
      payload.courtId,
      payload.coachId || null,
      payload.rackets || 0,
      payload.shoes || 0,
      payload.startTime,
      payload.endTime,
      price
    );
    return { id: info.lastInsertRowid, price };
  });

  try {
    const out = insertTx({
      userName,
      courtId: Number(courtId),
      coachId: coachId ? Number(coachId) : null,
      rackets: Number(rackets || 0),
      shoes: Number(shoes || 0),
      startTime: start,
      endTime: end
    });
    return res.json(out);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};