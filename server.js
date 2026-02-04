// Imports
import express from "express";
import { loqReq, globalErr } from "./middleware/middlewares.js";
import dotenv from "dotenv";

// Set Ups
dotenv.config();
const app = express();
const PORT = process.env.PORT || "";


// (Request) Middleswares
app.use(express.json());
app.use(logReq);

// Routes


// Global Error Handling Middleware
app.use(globalErr);

// Listener
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
})