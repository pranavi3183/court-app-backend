import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const db = new Database("sports.db");

const schema = fs.readFileSync(path.join("db", "schema.sql"), "utf8");
db.exec(schema);

export default db;
