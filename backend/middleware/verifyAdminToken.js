import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyAdminToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;

        // Fetch the user to check the role
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check if the user role is 'admin'
        if (user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied - Admins only" });
        }

        next(); // User is authorized
    } catch (error) {
        console.error("Error in verifyAdminToken:", error); // Log detailed error for debugging
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
