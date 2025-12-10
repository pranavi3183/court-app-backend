import db from "../../db/database.js";

export const getCoaches = (req, res) => {
    res.json(db.prepare("SELECT * FROM coaches").all());
};
