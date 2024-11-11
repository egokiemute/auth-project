import express from "express";
import { login, logout, register, googleAuth, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdminToken } from "../middleware/verifyAdminToken.js";
import { createSpace } from "../controllers/space.controller.js";
import { createTab } from "../controllers/tabs.controller.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

// Route for Email/Password Registration
router.post("/register", register);

// Route for Google Sign-Up/Sign-In
router.post("/google", googleAuth);

router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);


// Space routes
router.post("/create", verifyAdminToken, createSpace);

// Tabs Routes
router.post("/create-tab", verifyAdminToken, createTab)

export default router;