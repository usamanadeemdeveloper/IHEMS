import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  if (!process.env.MONGO_DB_URI)
    throw new Error("MONGO_DB_URI is not defined in environment");

  return mongoose.connect(process.env.MONGO_DB_URI);
}
