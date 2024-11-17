import express from "express";
import { login, logout, register, googleAuth, verifyEmail, forgotPassword, resetPassword, checkAuth, initiate, loginAdmin, updateUser } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdminToken } from "../middleware/verifyAdminToken.js";
import { createSpace } from "../controllers/space.controller.js";
import { createTab, fetchAllTabs } from "../controllers/tabs.controller.js";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

// Route for Email/Password Registration
router.post("/initiate", initiate);
router.post("/register", register);

// Route for Google Sign-Up/Sign-In
router.post("/google", googleAuth);

router.post("/login", login);
router.post("/admin-login", loginAdmin);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

// Update profile
router.put("/user/:id", updateUser);

// Space routes
router.post("/create", verifyAdminToken, createSpace);

// Tabs Routes
router.post("/create-tab", verifyAdminToken, createTab)
router.get("/tabs", fetchAllTabs);

export default router;