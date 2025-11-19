import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = "mongodb+srv://priyanshugiri63:KkBjEUe5njFZM2k4@cluster0.m1mclcw.mongodb.net/";

    if (!db) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }

    const { connection } = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${connection.host}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message || err);
    process.exit(1); // Stop server on DB failure
  }
};