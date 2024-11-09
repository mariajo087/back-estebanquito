import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    incomeHistory: {
      amount: { type: Number, required: true },
      date: { type: String, required: true },
    },

    expenseHistory: {
      amount: { type: Number, required: true },
      date: { type: String, required: true },
    },

    debts: {
      creditor: { type: String, required: true },
      amount: { type: Number, required: true },
      dueDate: { type: String, required: true },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
