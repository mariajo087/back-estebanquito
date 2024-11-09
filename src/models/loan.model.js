import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "PAID"],
      default: "PENDING",
    },
    reference: {
      type: String,
      default: Math.floor(Math.random() * 100000),
    },
  },
  { timestamps: true }
);

export default mongoose.model("Loan", loanSchema);
