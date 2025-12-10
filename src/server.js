import express from "express";
import cors from "cors";
import courtRoutes from "./routes/courtRoutes.js";
import coachRoutes from "./routes/coachRoutes.js";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import pricingRoutes from "./routes/pricingRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Sports Facility Booking Backend Running 🚀"));

app.use("/courts", courtRoutes);
app.use("/coaches", coachRoutes);
app.use("/equipment", equipmentRoutes);
app.use("/bookings", bookingRoutes);
app.use("/pricing", pricingRoutes);

const PORT = 4000;
app.listen(PORT, () => console.log("Server running on port", PORT));
