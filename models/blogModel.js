import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    blogHeading: { type: String, required: true, unique: true },
    blogImage: { type: String, default: "" },
    blogContent: { type: String, required: true },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);
export default blogModel;
