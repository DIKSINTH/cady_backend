import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    blogHeading: { type: String, required: true },
    blogImage: { type: String, default: "" },
    blogContent: { type: String, required: true },
  },
  { timestamps: true }
);

const blogModel = mongoose.model("blogs", blogSchema);
export default blogModel;
