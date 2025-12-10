import db from "../../db/database.js";

export const getRules = (req, res) => {
    const rules = db.prepare("SELECT * FROM pricing_rules").all();
    res.json(rules);
};

export const addRule = (req, res) => {
    const { name, type, value, startHour, endHour, dayOfWeek } = req.body;

    const stmt = db.prepare(`
        INSERT INTO pricing_rules (name, type, value, startHour, endHour, dayOfWeek)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(name, type, value, startHour, endHour, dayOfWeek);
    res.json({ id: result.lastInsertRowid });
};
