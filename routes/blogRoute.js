import express from "express";
import blogModel from "../models/blogModel.js";
import upload from "../config/multer.js";

const router = express.Router();

// POST Blog
router.post("/", upload.single("blogImage"), async (req, res) => {
  try {
    const { blogHeading, blogContent } = req.body;

    // Validation
    if (!blogHeading || !blogContent) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Image upload
    const imageUrl = req.file ? req.file.path : "";

    // Create blog
    const blog = new blogModel({
      blogHeading,
      blogContent,
      blogImage: imageUrl,
    });

    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await blogModel.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
