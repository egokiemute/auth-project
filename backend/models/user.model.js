import mongoose from "mongoose";

// Define the schema for a User
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: function () { return !this.googleId; } // Password required only if not using Google sign-up
    },
    googleId: {
        type: String, // New field to store Google ID
        unique: true,
        sparse: true // Allows either a unique Google ID or a unique email/password combination
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    profilePicture: {
        type: String,
        default: 'default.jpg',
    },
    bio: {
        type: String,
        trim: true,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
}, { timestamps: true });

// Create a User model based on the schema
export const User = mongoose.model('User', userSchema);
