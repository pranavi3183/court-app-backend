// src/services/availabilityService.js
import db from "../../db/database.js";

export const isAvailable = (courtId, coachId, racketsReq, shoesReq, start, end) => {
  const cId = Number(courtId);

  // 1. Court overlap (same court)
  const overlap = db.prepare(`
    SELECT 1 FROM bookings
    WHERE courtId = ?
      AND status = 'confirmed'
      AND startTime < ?
      AND endTime > ?
    LIMIT 1
  `).get(cId, end, start);

  if (overlap) return { ok: false, message: "Court already booked for this time." };

  // 2. Coach check (if provided)
  if (coachId) {
    const coachOverlap = db.prepare(`
      SELECT 1 FROM bookings
      WHERE coachId = ?
        AND status = 'confirmed'
        AND startTime < ?
        AND endTime > ?
      LIMIT 1
    `).get(coachId, end, start);
    if (coachOverlap) return { ok: false, message: "Coach unavailable." };
  }

  // 3. Equipment for this court only
  const totalRows = db.prepare(`
    SELECT name, total FROM equipment_per_court WHERE courtId = ?
  `).all(cId);

  const totals = {};
  totalRows.forEach(r => totals[r.name] = r.total || 0);

  const usedRow = db.prepare(`
    SELECT IFNULL(SUM(rackets),0) AS usedRackets, IFNULL(SUM(shoes),0) AS usedShoes
    FROM bookings
    WHERE courtId = ?
      AND status = 'confirmed'
      AND startTime < ?
      AND endTime > ?
  `).get(cId, end, start) || { usedRackets: 0, usedShoes: 0 };

  const availRackets = (totals['racket'] || 0) - (usedRow.usedRackets || 0);
  const availShoes   = (totals['shoes']  || 0) - (usedRow.usedShoes || 0);

  if ((racketsReq || 0) > availRackets) return { ok: false, message: "Not enough rackets available." };
  if ((shoesReq || 0) > availShoes)       return { ok: false, message: "Not enough shoes available." };

  return { ok: true };
};
