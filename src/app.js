import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transaction.routers.js";
import loanRoutes from "./routes/loan.router.js";
import reportRoutes from "./routes/report.routers.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/report", reportRoutes);

export default app;
