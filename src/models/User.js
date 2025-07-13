import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  preferences: {
    billingCycleDays: { type: Number, default: 30 },
    incomeTaxRegistered: { type: Boolean, default: true },
  },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
