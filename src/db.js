import mongoose from "mongoose";

import { DB_URI as MONGO_URI } from "./config.js";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log("Connect to", db.connection.name);
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error.message);
  }
};
export default connectDB;
