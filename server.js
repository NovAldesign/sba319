// Imports
import express from "express";
import { loqReq, globalErr } from "./middleware/middlewares.js";
import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import applicantRoutes from "./routes/applicantRoutes.js"

// Set Ups
dotenv.config();
const app = express();
const PORT = process.env.PORT || "";


// (Request) Middleswares
app.use(express.json());
app.use(logReq);

// Routes
app.use("/api/applicant", applicantRoutes);

// Global Error Handling Middleware
app.use(globalErr);

// Listener
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
})