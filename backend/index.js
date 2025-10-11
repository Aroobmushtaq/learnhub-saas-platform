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
// import express from "express";
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

// // ✅ Allowed frontend URLs (your deployed + local)
// const allowedOrigins = [
//   "https://frontend-2hqrwvedv-aroob-mushtaqs-projects.vercel.app", // your actual deployed frontend
//   "http://localhost:3000", // for local development
// ];

// // ✅ Global CORS setup
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         console.log("❌ Blocked by CORS:", origin);
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );

// // ✅ Stripe webhook route (before JSON middleware)
// app.post(
//   "/api/payments/webhook",
//   express.raw({ type: "application/json" }),
//   stripeWebhook
// );

// // ✅ JSON parser
// app.use(express.json());

// // ✅ Static uploads folder
// app.use("/uploads", express.static("uploads"));

// // ✅ API routes
// app.use("/api/auth", router);
// app.use("/api/courses", courseRouter);
// app.use("/api/enrollments", enrollmentRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/lessons", lessonRoutes);
// app.use("/api/instructor", instructorRoutes);
// app.use("/api/admin", adminRoutes);

// // ✅ Test route
// app.get("/", (req, res) => {
//   res.send("✅ Backend running successfully!");
// });

// // ✅ 404 handler
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
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

// ✅ Global CORS setup – allows all frontends and preflights
app.use(
  cors({
    origin: (origin, callback) => callback(null, true), // allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Stripe webhook route (must come before JSON parser)
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// ✅ JSON parser
app.use(express.json());

// ✅ Static uploads folder
app.use("/uploads", express.static("uploads"));

// ✅ API routes
app.use("/api/auth", router);
app.use("/api/courses", courseRouter);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/instructor", instructorRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Backend running successfully!");
});

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
