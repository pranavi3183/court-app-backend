import db from "../../db/database.js";

export const isAvailable = (courtId, coachId, rackets, start, end) => {
    // 1. COURT OVERLAP
    const overlaps = db.prepare(`
        SELECT * FROM bookings 
        WHERE courtId = ?
        AND startTime < ?
        AND endTime > ?
    `).all(courtId, end, start);

    if (overlaps.length > 0)
        return { ok: false, message: "Court already booked for this time." };

    // 2. COACH CHECK
    if (coachId) {
        const coachOverlaps = db.prepare(`
            SELECT * FROM bookings
            WHERE coachId = ?
            AND startTime < ?
            AND endTime > ?
        `).all(coachId, end, start);

        if (coachOverlaps.length > 0)
            return { ok: false, message: "Coach unavailable." };
    }

    // 3. EQUIPMENT CHECK
    const totalRackets = db.prepare("SELECT total FROM equipment WHERE name='racket'").get()?.total || 0;

    const bookedRackets = db.prepare(`
        SELECT SUM(rackets) as used
        FROM bookings
        WHERE startTime < ? AND endTime > ?
    `).get(end, start)?.used || 0;

    if (bookedRackets + rackets > totalRackets)
        return { ok: false, message: "Not enough rackets available." };

    return { ok: true };
};
