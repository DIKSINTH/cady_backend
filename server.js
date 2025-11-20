import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import blogRoute from "./routes/blogRoute.js";

dotenv.config();

const app = express();

// CORS FIXED
app.use(
  cors({
    origin: ["http://localhost:5173", "https://cadyfrontend.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/admin", blogRoute);

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server Running on Port ${PORT}`));
