import db from "../../db/database.js";

export const getEquipment = (req, res) => {
    res.json(db.prepare("SELECT * FROM equipment").all());
};
