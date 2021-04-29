const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    img: String,
    price: Number,
    description: { type: String, required: true },
    recommend: String,
    boughtAt: String,
  },
  {
    timestamp: true,
  }
);

const Items = mongoose.model("Items", itemsSchema);

module.exports = Items;
