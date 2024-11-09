import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["DEPOSIT", "WITHDRAWAL"], required: true },
    icon: {
      type: String,
      default: "💳",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
