import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import blogRoute from "./routes/blogRoute.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://cadyfrontend.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/admin", blogRoute);

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("MongoDB Error : ", error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
