import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = "mongodb://localhost:27017";

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