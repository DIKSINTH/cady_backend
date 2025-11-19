import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected Successfully ${conn.connection.host}`);
  } catch (err) {
    console.log(`MongoDB Connection Error : ${err.message}`);
    process.exit(1);
  }
};
