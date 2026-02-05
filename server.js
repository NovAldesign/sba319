// Imports
import express from "express";
import dotenv from "dotenv";
import { logReq, globalErr } from "./middleware/middlewares.js";
import connectDB from "./db/conn.js";
import applicantRoutes from "./routes/applicantRoutes.js"

// Set Ups
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
connectDB();


// (Request) Middleswares
app.use(express.json());
app.use(logReq);

// Routes
app.use("/api/applicants", applicantRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/partnerships", partnershipRoutes);


// Global Error Handling Middleware
app.use(globalErr);

// Listener
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
});