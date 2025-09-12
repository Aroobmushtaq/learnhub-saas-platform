import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  stripeSessionId: { type: String },
  amount: { type: Number }, // cents
  currency: { type: String, default: "usd" },
  status: { type: String, enum: ["pending","paid","failed"], default: "pending" },
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
