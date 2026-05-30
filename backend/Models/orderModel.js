import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }, // store price at order time
      },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" },
    address: { type: String, required: true },
    paymentMethod: { type: String, enum: ["COD", "Online"], default: "COD" },
  },
  { timestamps: true }
);

export default   mongoose.model("order", orderSchema);
