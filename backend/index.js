import express from "express";
import path from "path";
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

// Stripe webhook must use raw body, so add this BEFORE express.json()
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// Then parse normal JSON for all other routes
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", router);
app.use("/api/courses", courseRouter);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/instructor", instructorRoutes);
app.get("/", (req, res) => {
  res.send("server is running");
});
app.get("/success", (req, res) => {
  res.send("Payment successful! (Backend test)");
});
app.get("/cancel", (req, res) => {
  res.send("Payment cancelled! (Backend test)");
});
app.use("/api/admin", adminRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});




// import serverless from "serverless-http";
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

// // ✅ Connect to database (handle cold starts safely if needed)
// await connectDB();

// const app = express();

// // ✅ CORS
// app.use(cors({ origin: "*", methods: ["GET","POST","PUT","DELETE","PATCH"], allowedHeaders:["Content-Type","Authorization"] }));
// app.options("*", cors());

// // ✅ Stripe webhook (raw body)
// app.post("/api/payments/webhook", express.raw({ type: "application/json" }), stripeWebhook);

// // ✅ JSON parser
// app.use(express.json());

// // ✅ Static uploads
// app.use("/uploads", express.static("uploads"));

// // ✅ Routes
// app.use("/api/auth", router);
// app.use("/api/courses", courseRouter);
// app.use("/api/enrollments", enrollmentRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/lessons", lessonRoutes);
// app.use("/api/instructor", instructorRoutes);
// app.use("/api/admin", adminRoutes);

// // ✅ Test route
// app.get("/", (req, res) => res.send("✅ Backend running successfully!"));

// // ✅ 404
// app.use((req,res)=>res.status(404).json({ message: "Route not found"}));

// // ❌ REMOVE app.listen()
// // ✅ Export serverless handler
// export const handler = serverless(app);
