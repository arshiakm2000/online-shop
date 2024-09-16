const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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
  firstName: { type: String, required: [true, "please enter a name"] },
  lastName: { type: String, required: [true, "please enter a last name"] },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: [true, "email already in use"],
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [8, "Minimum password length is 8 characters"],
  },
  phoneNumber: { type: String },
  addresses: [addressSchema],
  orders: [orderSchema],
  role: { type: String, enum: ["customer", "admin"], default: "customer" },
  isActive: { type: Boolean, default: true },
  verifiedEmail: { type: Boolean, default: false }, // Email verified flag
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
// hashing password before saving in db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Middleware to update the updatedAt field
userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
