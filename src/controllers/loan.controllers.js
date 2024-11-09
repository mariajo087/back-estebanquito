import Loan from "../models/loan.model.js";
import User from "../models/user.model.js";

export const createLoan = async (req, res) => {
  const { userId, amount } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    const newLoan = new Loan({ userId, amount });
    const savedLoan = await newLoan.save();

    if (!savedLoan) return res.status(400).json({ message: "Loan failed" });

    user.amount += amount;

    const userSaved = await user.save();

    return res.send(userSaved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserLoans = async (req, res) => {
  const { userId } = req.params;

  try {
    const loans = await Loan.find({ userId, status: "PENDING" });
    console.log(loans);
    if (!loans) return res.status(400).json({ message: "No loans found" });

    return res.send(loans);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const payLoan = async (req, res) => {
  const { reference, amount } = req.body;

  try {
    const loan = await Loan.findOne({ reference });
    if (!loan) return res.status(400).json({ message: "Loan not found" });

    if (loan.amount - amount < 0)
      return res.status(400).json({ message: "Invalid amount" });

    loan.amount -= amount;
    if (loan.amount === 0) {
      loan.status = "PAID";
    }

    const loanUpdated = await loan.save();

    console.log(loanUpdated);

    const user = await User.findById(loan.userId);

    user.amount -= amount;
    await user.save();

    return res.send({ amount: amount });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
