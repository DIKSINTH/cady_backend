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

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server Running on Port ${PORT}`));
