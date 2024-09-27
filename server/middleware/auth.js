import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const auth = async (req, res, next) => {
    // console.log("Headers:", req.headers); // Debugging line
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            console.error("No token provided");
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        let decodedData;

        try {
            decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.userId = decodedData?.id;
        } catch (error) {
            console.error("Token verification failed:", error);
            return res.status(401).json({ message: "Invalid token" });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            console.log(`User with ID ${req.userId} not found in the database.`);
            return res.status(401).json({ message: "User not found, please log in again." });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized" });
    }
};

export default auth;
