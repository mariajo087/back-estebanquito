import Report from "../models/report.model.js";
import User from "../models/user.model.js";

export const createReport = async (req, res) => {
  const { userId, incomeHistory, expenseHistory, debts } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    const newReport = new Report({
      userId,
      incomeHistory,
      expenseHistory,
      debts,
    });
    const savedReport = await newReport.save();

    if (!savedReport)
      return res.status(400).json({ message: "Report could not be created" });

    res.send(savedReport);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserReports = async (req, res) => {
  const { userId } = req.params;

  try {
    const reports = await Report.find({ userId });
    if (!reports || reports.length === 0)
      return res.status(400).json({ message: "No reports found" });

    res.send(reports);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
