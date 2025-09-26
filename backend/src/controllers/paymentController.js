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
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.description,
            },
            unit_amount: Math.round(course.price * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: req.user._id.toString(),
        courseId: courseId.toString(),
      },
      success_url: `${YOUR_DOMAIN}/payment/success`,
      cancel_url: `${YOUR_DOMAIN}/courses/${courseId}`,
      // success_url: "http://localhost:5000/success?session_id={CHECKOUT_SESSION_ID}",
      // cancel_url: "http://localhost:5000/cancel",
    });

    // create a pending Payment record (optional)
    await Payment.create({
      user: req.user._id,
      course: courseId,
      stripeSessionId: session.id,
      amount: Math.round(course.price * 100),
      currency: "usd",
      status: "pending",
    });

    // Return session URL so frontend can redirect
    res.json({ url: session.url, id: session.id });
  } catch (error) {
    console.error("createCheckoutSession error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Stripe webhook handler (must be raw body)
export const stripeWebhook = async (req, res) => {
  const stripeSignature = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, stripeSignature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Extract metadata
    const userId = session.metadata?.userId;
    const courseId = session.metadata?.courseId;

    try {
      // check existing enrollment
      const existing = await Enrollment.findOne({ student: userId, course: courseId });
      if (!existing) {
        await Enrollment.create({ student: userId, course: courseId, status: "active" });
      }

      // Update Payment record (if you created one)
      if (session.id) {
        await Payment.findOneAndUpdate(
          { stripeSessionId: session.id },
          { status: "paid" },
          { new: true }
        );
      }

      console.log(`User ${userId} enrolled in ${courseId} via Stripe session ${session.id}`);
    } catch (err) {
      console.error("Error in webhook processing:", err);
      // Do NOT send 500 to Stripe — return 200 so Stripe does not keep retrying if you want to handle later,
      // but better practice is to return 200 only when you succeed; otherwise return 400 to notify Stripe to retry.
      return res.status(500).send();
    }
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};
// ✅ Verify payment session
export const verifyPayment = async (req, res) => {
  try {
    const sessionId = req.params.sessionId;
    const payment = await Payment.findOne({ stripeSessionId: sessionId }).populate("course");

    if (!payment) return res.status(404).json({ message: "Payment not found" });

    if (payment.status !== "paid") {
      return res.json({ message: "Payment is still pending, please wait." });
    }

    res.json({
      message: "Payment verified successfully! Enrollment confirmed.",
      course: payment.course,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
