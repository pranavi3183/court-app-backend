CREATE TABLE IF NOT EXISTS courts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS coaches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    isAvailable INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS equipment (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    total INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userName TEXT,
    courtId INTEGER,
    coachId INTEGER,
    rackets INTEGER DEFAULT 0,
    shoes INTEGER DEFAULT 0,
    startTime TEXT,
    endTime TEXT,
    price REAL DEFAULT 0,
    status TEXT DEFAULT 'confirmed',

    FOREIGN KEY (courtId) REFERENCES courts(id),
    FOREIGN KEY (coachId) REFERENCES coaches(id)
);

CREATE TABLE IF NOT EXISTS pricing_rules (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    type TEXT,
    value REAL,
    startHour INTEGER,
    endHour INTEGER,
    dayOfWeek INTEGER
);
