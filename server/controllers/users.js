import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import User from "../models/user.js";

// Load environment variables from .env file
dotenv.config();

export const getuser = async (req, res) => {
  try {
    const getUsers = await User.find();
    res.status(200).json(getUsers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
          console.error(`User not found with email: ${email}`);
          return res.status(404).json({ message: "User doesn't exist." });
      }

      const isPassword = await bcrypt.compare(password, user.password);
      if (!isPassword) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1h",
      });

      res.status(200).json({ result: user, token });
  } catch (error) {
      res.status(500).json({ message: "Something went wrong." });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  
  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists." }); // Added return statement

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });

    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Log before creating user
    console.log("Attempting to create a new user with email:", email);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
      id: new mongoose.Types.ObjectId() // Generate a unique ObjectId
    });

    // Log after successfully creating user
    console.log("User created successfully with ID:", result._id);

    const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "5m",
    });

    res.status(200).json({ result, token });
  } catch (error) {
    console.error("Error occurred during signup:", error); // Enhanced error logging
    res.status(500).json({ message: "Something went wrong." });
  }
};
