// import express from "express";
// import path from "path";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./src/config/db.js";
// import router from "./src/routes/authRoutes.js";
// import courseRouter from "./src/routes/courseRoutes.js";
// import enrollmentRoutes from "./src/routes/enrollmentRoutes.js";
// import paymentRoutes from "./src/routes/paymentRoutes.js";
// import { stripeWebhook } from "./src/controllers/paymentController.js";
// import lessonRoutes from "./src/routes/lessonRoutes.js";
// import instructorRoutes from "./src/routes/instructorRoutes.js";
// import adminRoutes from "./src/routes/adminRoutes.js";
// dotenv.config();
// connectDB();
// const app = express();

// // Stripe webhook must use raw body, so add this BEFORE express.json()
// app.post(
//   "/api/payments/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhook
// );

// // Then parse normal JSON for all other routes
// app.use(express.json());
// app.use(cors());
// app.use("/uploads", express.static("uploads"));
// app.use("/api/auth", router);
// app.use("/api/courses", courseRouter);
// app.use("/api/enrollments", enrollmentRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/lessons", lessonRoutes);
// app.use("/api/instructor", instructorRoutes);
// app.get("/", (req, res) => {
//   res.send("server is running");
// });
// app.get("/success", (req, res) => {
//   res.send("Payment successful! (Backend test)");
// });
// app.get("/cancel", (req, res) => {
//   res.send("Payment cancelled! (Backend test)");
// });
// app.use("/api/admin", adminRoutes);
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`server is running on port ${PORT}`);
// });
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import router from "./src/routes/authRoutes.js";
import courseRouter from "./src/routes/courseRoutes.js";
import enrollmentRoutes from "./src/routes/enrollmentRoutes.js";
import paymentRoutes from "./src/routes/paymentRoutes.js";
import { stripeWebhook } from "./src/controllers/paymentController.js";
import lessonRoutes from "./src/routes/lessonRoutes.js";
import instructorRoutes from "./src/routes/instructorRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Allowed frontend URLs
const allowedOrigins = [
  "https://frontend-aroobmushtaqs-projects.vercel.app", // ✅ your frontend deployed link (update this)
  "http://localhost:3000", // ✅ local testing
];

// ✅ Global CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// ✅ Stripe webhook route (must come before JSON middleware)
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// ✅ JSON parser for all other routes
app.use(express.json());

// ✅ Static file serving
app.use("/uploads", express.static("uploads"));

// ✅ Main API routes
app.use("/api/auth", router);
app.use("/api/courses", courseRouter);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});

// ✅ Handle unknown routes
app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
