-- Add per-court equipment table
CREATE TABLE IF NOT EXISTS equipment_per_court (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  courtId INTEGER NOT NULL,
  name TEXT NOT NULL,    -- 'racket' or 'shoes'
  total INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY(courtId) REFERENCES courts(id)
);

-- Example seeds (run once) - adjust courtId & totals as needed:
INSERT INTO equipment_per_court (courtId, name, total) VALUES (1, 'racket', 6);
INSERT INTO equipment_per_court (courtId, name, total) VALUES (1, 'shoes', 6);

INSERT INTO equipment_per_court (courtId, name, total) VALUES (2, 'racket', 6);
INSERT INTO equipment_per_court (courtId, name, total) VALUES (2, 'shoes', 6);

INSERT INTO equipment_per_court (courtId, name, total) VALUES (3, 'racket', 6);
INSERT INTO equipment_per_court (courtId, name, total) VALUES (3, 'shoes', 6);
