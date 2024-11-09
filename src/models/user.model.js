import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 12,
      min: 6,
    },
    numberAccount: {
      type: Number,
      required: true,
      default: Math.floor(Math.random() * 10000000000000000),
      unique: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    cvv: {
      type: Number,
      default: Math.floor(Math.random() * 100),
      required: true,
    },
    expirationDate: {
      type: String,
      default: "01/25",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
