import Stripe from "stripe";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import Payment from "../models/Payment.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });

// Create Checkout Session (student -> call this from frontend)
export const createCheckoutSession = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        // If free course: create enrollment directly (no payment)
        if (!course.price || course.price <= 0) {
            const existing = await Enrollment.findOne({ student: req.user._id, course: courseId });
            if (!existing) {
                const enrollment = await Enrollment.create({ student: req.user._id, course: courseId, status: "active" });
                return res.json({ success: true, message: "Enrolled (free course)", enrollment });
            } else {
                return res.status(400).json({ message: "Already enrolled" });
            }
        }

        const YOUR_DOMAIN = process.env.FRONTEND_URL || "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [
                {
                    price_data: {
                        currency: "usd", // change if needed
                        product_data: {
                            name: course.title,
                            description: course.description,
                        },
                        unit_amount: Math.round(course.price * 100), // price in cents
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId: req.user._id.toString(),
                courseId: courseId.toString(),
            },
            success_url: `${YOUR_DOMAIN}/payments/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/courses/${courseId}`,
        })