// src/controllers/equipmentController.js
import db from "../../db/database.js";

/**
 * GET /equipment
 * Return all per-court equipment rows
 */
export const getEquipment = (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM equipment_per_court ORDER BY courtId, name").all();
    res.json(rows);
  } catch (err) {
    console.error("getEquipment:", err);
    res.status(500).json({ error: "Failed to fetch equipment" });
  }
};

/**
 * GET /equipment/availability?courtId=&start=&end=
 * Return totals, used and available counts for rackets & shoes for that court/time window.
 */
export const getAvailability = (req, res) => {
  try {
    const { courtId, start, end } = req.query;
    if (!courtId || !start || !end) {
      return res.status(400).json({ error: "courtId, start and end are required" });
    }
    const cId = Number(courtId);

    // totals for this court (may be empty)
    const totalsRows = db.prepare(`SELECT name, total FROM equipment_per_court WHERE courtId = ?`).all(cId);
    const totals = {};
    totalsRows.forEach(r => { totals[r.name] = Number(r.total || 0); });

    // used amounts for overlapping confirmed bookings
    const usedRow = db.prepare(`
      SELECT IFNULL(SUM(rackets),0) AS usedRackets, IFNULL(SUM(shoes),0) AS usedShoes
      FROM bookings
      WHERE courtId = ?
        AND status = 'confirmed'
        AND startTime < ?
        AND endTime > ?
    `).get(cId, end, start) || { usedRackets: 0, usedShoes: 0 };

    const used = { rackets: Number(usedRow.usedRackets || 0), shoes: Number(usedRow.usedShoes || 0) };

    const available = {
      racket: Math.max(0, (totals['racket'] || 0) - used.rackets),
      shoes:  Math.max(0, (totals['shoes']  || 0) - used.shoes)
    };

    return res.json({ courtId: cId, totals, used, available });
  } catch (err) {
    console.error("getAvailability:", err);
    return res.status(500).json({ error: "Failed to compute availability" });
  }
};

/**
 * POST /equipment/admin
 * Body: { courtId, name, total }
 * If a row exists for (courtId, name) it updates, else inserts.
 */
export const upsertEquipmentForCourt = (req, res) => {
  try {
    const { courtId, name, total } = req.body;
    if (!courtId || !name || typeof total !== "number") {
      return res.status(400).json({ error: "courtId, name and numeric total are required" });
    }
    const cId = Number(courtId);

    const existing = db.prepare(`SELECT id FROM equipment_per_court WHERE courtId = ? AND name = ?`).get(cId, name);
    if (existing) {
      db.prepare(`UPDATE equipment_per_court SET total = ? WHERE id = ?`).run(total, existing.id);
      return res.json({ id: existing.id, courtId: cId, name, total });
    } else {
      const info = db.prepare(`INSERT INTO equipment_per_court (courtId, name, total) VALUES (?, ?, ?)`).run(cId, name, total);
      return res.json({ id: info.lastInsertRowid, courtId: cId, name, total });
    }
  } catch (err) {
    console.error("upsertEquipmentForCourt:", err);
    return res.status(500).json({ error: "Failed to upsert equipment" });
  }
};
