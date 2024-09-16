const mongoose = require("mongoose");
const { Schema } = mongoose;

const itemSchema = new Schema({
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: [{ type: String }],
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
