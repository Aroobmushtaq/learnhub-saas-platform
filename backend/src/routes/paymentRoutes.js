import express from "express";
import { createCheckoutSession, verifyPayment } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Student initiates checkout
router.post("/create-checkout-session/:courseId", protect, authorizeRoles("student"), createCheckoutSession);
router.get("/verify/:sessionId", protect, verifyPayment);
export default router;
