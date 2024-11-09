import Transaction from "../models/transaction.model.js";
import User from "../models/user.model.js";

export const createTransaction = async (req, res) => {
  const { userId, amount, type, to } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ message: "User not found" });

    const userTo = await User.findOne({ numberAccount: to });

    if (!userTo) return res.status(400).json({ message: "User to not found" });

    const newTransaction = new Transaction({
      userId,
      amount,
      type,
      to: userTo._id,
    });
    const savedTransaction = await newTransaction.save();

    if (!savedTransaction)
      return res.status(400).json({ message: "Transaction failed" });

    userTo.amount += amount;
    user.amount -= amount;

    const userSaved = await user.save();
    await userTo.save();

    res.send(userSaved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserTransactions = async (req, res) => {
  const { userId } = req.params;
  try {
    const transactionsN = await Transaction.find({ userId })
      .populate("to", "name")
      .populate("userId", "name");
    const transactionsP = await Transaction.find({ to: userId })
      .populate("to", "name")
      .populate("userId", "name");
    res.send(
      [...transactionsN, ...transactionsP].sort(
        (a, b) => b.createdAt - a.createdAt
      )
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
