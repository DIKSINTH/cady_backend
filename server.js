import express from "express";
import cors from "cors";
import AboutUsRoutes from "./routes/AboutUs.js";
import AdminCheckRoutes from "./routes/AdminCheck.js";
import path from "path";

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

// ✅ Serve uploads folder directly (ensure multer stores in './uploads')
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/login", AdminCheckRoutes);
// About Us Routes
app.use("/api/aboutus", AboutUsRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
