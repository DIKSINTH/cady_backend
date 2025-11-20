import express from "express";
import blogModel from "../models/blogModel.js";
import upload from "../config/multer.js";

const router = express.Router();

// CREATE BLOG
router.post("/", upload.single("blogImage"), async (req, res) => {
  try {
    const { blogHeading, blogContent } = req.body;

    if (!blogHeading || !blogContent) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const imageUrl = req.file ? req.file.path : "";

    const blog = await blogModel.create({
      blogHeading,
      blogContent,
      blogImage: imageUrl,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (err) {
    console.log("Error:", err);

    // Duplicate handling (if you add unique later)
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Blog heading already exists",
      });
    }

    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// GET ALL BLOGS
router.get("/", async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
