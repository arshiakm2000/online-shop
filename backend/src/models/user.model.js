const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Address subdocument schema
const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

// Order subdocument schema
const orderSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: { type: Date },
});

// User schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  addresses: [addressSchema],
  orders: [orderSchema],
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  isActive: { type: Boolean, default: true },
  verifiedEmail: { type: Boolean, default: false }, // Email verified flag
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update the updatedAt field
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
