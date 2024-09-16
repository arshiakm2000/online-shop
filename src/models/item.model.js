const mongoose = require("mongoose");
const { Schema } = mongoose;


const itemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: [{type: String,}]
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
