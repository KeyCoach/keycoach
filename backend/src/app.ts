import express from "express";
import cors from "cors";
import handlers from "./handlers";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/test", handlers.Test);

export default app;
