import db from "../../db/database.js";

export const getCourts = (req, res) => {
    const courts = db.prepare("SELECT * FROM courts").all();
    res.json(courts);
};

export const addCourt = (req, res) => {
    const { name, type } = req.body;
    const stmt = db.prepare("INSERT INTO courts (name, type) VALUES (?, ?)");
    const result = stmt.run(name, type);

    res.json({ id: result.lastInsertRowid, name, type });
};
