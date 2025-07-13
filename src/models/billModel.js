import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  month: { type: String, required: true },
  units: { type: Number, required: true },
  cost: { type: Number, required: true },
  isLive: { type: Boolean, default: false },
  uploadedAt: { type: Date, default: Date.now },
},
  { timestamps: true }
);

export default mongoose.models.Bill || mongoose.model("Bill", billSchema);
