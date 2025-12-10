import db from "../../db/database.js";

export const calculatePrice = (startTime, courtId) => {
    let base = 10; // base price

    const date = new Date(startTime);
    const hour = date.getHours();
    const day = date.getDay();

    const rules = db.prepare("SELECT * FROM pricing_rules").all();

    rules.forEach(rule => {
        if (rule.type === "weekend" && (day === 0 || day === 6)) {
            base += rule.value;
        }
        if (rule.type === "peak" && hour >= rule.startHour && hour < rule.endHour) {
            base *= rule.value; // multiplier
        }
        if (rule.type === "courtType") {
            const court = db.prepare("SELECT type FROM courts WHERE id=?").get(courtId);
            if (court.type === "indoor") base += rule.value;
        }
    });

    return base;
};
