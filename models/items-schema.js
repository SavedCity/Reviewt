const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemsSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    img: { type: String, required: false },
    price: String,
    description: { type: String, required: true, minLength: 8, maxLength: 300 },
    recommend: String,
    boughtAt: { type: String, required: true },
    star: { type: String, required: true },
    createdBy: String,
  },
  {
    timestamp: true,
  }
);

const Items = mongoose.model("Items", itemsSchema);

module.exports = Items;
