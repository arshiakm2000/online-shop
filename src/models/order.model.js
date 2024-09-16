const mongoose = require("mongoose");
const { Schema } = mongoose;





const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],  // Referencing items
  shippingAddress: {type: Schema.Types.ObjectId, ref: "address" },
  
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  orderStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
});


orderSchema.pre("save", function (next) {
  if (this.orderStatus === "delivered" && !this.deliveryDate) {
    this.deliveryDate = Date.now();
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
