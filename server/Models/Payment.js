import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    ExtraVoteUnitPrice: {
      type: Number,
      required: true,
      default: 5,
    },
    TotalQuantity: {
      type: Number,
      required: true,
    },
    TotalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", PaymentSchema);
export default Payment;
