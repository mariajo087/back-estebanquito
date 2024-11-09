import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(400).json({ message: "Users not found" });
  res.send(users);
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userFound = await User.findOne({
    emai: email,
  });

  if (userFound)
    return res.status(400).json({ message: "The email already exists" });
  const newUser = new User({ name, email, password });
  try {
    newUser.password = await bcrypt.hash(password, 10);
    const userSaved = await newUser.save();
    return res.send(userSaved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) return res.status(400).json({ message: "User not found" });
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword)
      return res.status(400).json({ message: "Invalid password" });
    return res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

export const findUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ message: "User not found" });
    return res.send(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const depositAmount = async (req, res) => {
  try {
    const { amount, numberAccount } = req.body;
    const user = await User.findOne({
      numberAccount,
    });
    if (!user) return res.status(400).json({ message: "Account not found" });
    user.amount += amount;
    const userUpdated = await user.save();
    return res.send(userUpdated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const withdrawAmount = async (req, res) => {
  try {
    const { amount, numberAccount } = req.body;
    const user = await User.findOne({
      numberAccount,
    });
    if (!user) return res.status(400).json({ message: "Account not found" });
    user.amount -= amount;
    const userUpdated = await user.save();
    return res.send(userUpdated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
