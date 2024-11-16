import bcrypt from "bcryptjs";
import crypto from "crypto";
import { OAuth2Client } from 'google-auth-library';

import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const initiate = async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            throw new Error("Enter your email");
        }

        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(400).json({ success: false, message: "Email already exist, login instead." })
        }

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
        })

        await user.save();

        // jwt
        generateTokenAndSetCookie(res, user._id);

        sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully, next step",
            user: {
                ...user._doc,
            }
        })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export const register = async (req, res) => {
    const { email, password, firstname, lastname, phone, nin } = req.body;

    try {
        // Check if the required fields are present
        if (!email || !password || !firstname || !lastname || !phone || !nin) {
            throw new Error("All fields are required");
        }

        // Find the existing user by email
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User not found");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update user details
        user.firstname = firstname;
        user.lastname = lastname;
        user.phone = phone;
        user.nin = nin;
        user.password = hashedPassword;

        // Save the updated user
        await user.save();

        // Generate JWT and set it as a cookie
        generateTokenAndSetCookie(res, user._id);

        // Send welcome email
        await sendWelcomeEmail(user.email, user.firstname);

        // Send response to client
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: {
                ...user._doc,
                password: undefined, // Hide password in response
            }
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// GOOGLE SIGN IN/UP
export const googleAuth = async (req, res) => {
    const { name, email, profilePicture, isVerified } = req.body; // Directly receive user details

    console.log(name, email)
    try {
        // Check if the user already exists in the database by their email
        let user = await User.findOne({ email });
        if (!user) {
            // Generate a placeholder password and hash it
            const placeholderPassword = email;
            const hashedPassword = await bcrypt.hash(placeholderPassword, 10);

            // If user doesn't exist, create a new user
            user = new User({
                name,
                email,
                profilePicture,
                googleId: email, // Using email as googleId as a unique identifier
                isVerified, // Automatically set as verified for Google users
                password: hashedPassword, // Use hashed placeholder password
            });
            await user.save();
        }

        // Generate token and set it in a cookie (or other desired response method)
        generateTokenAndSetCookie(res, user._id);

        // Optionally, send a welcome email to new users
        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Google login successful",
            user: {
                ...user._doc,
                password: undefined, // Exclude password from response
            },
        });
    } catch (error) {
        console.error("Error during Google authentication:", error);
        res.status(400).json({ success: false, message: "Google authentication failed" });
    }
};


export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("error in verifyEmail ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "No account was found connected to this email" });
        }

        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        // Generate token and set it as a cookie
        generateTokenAndSetCookie(res, user._id);

        // Update last login time
        user.lastLogin = new Date();
        await user.save();

        // Send response including user role
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });

    } catch (error) {
        console.log("Error in logging in: ", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    // Check if admin exists and verify credentials
    const admin = await User.findOne({ email, role: "admin" }); // Assuming 'role' field defines user type
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
  
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  
    res.status(200).json({ token });
  };


export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist." });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetTokenExpiresAt;

        await user.save();

        // send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset link sent to your email" });

    } catch (error) {
        console.log("Error in forgot password: ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired reset token"
            });
        }

        // update password
        const hashedPassword = await bcrypt.hash(password, 12);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;

        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({
            success: true,
            message: "Password reset successful"
        })

    } catch (error) {
        console.log("Error in reset password: ", error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
};