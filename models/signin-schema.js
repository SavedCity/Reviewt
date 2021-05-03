const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signinSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  img: String,
  about: { type: String, required: true },
  favStore: String,
});

const User = mongoose.model("User", signinSchema);

module.exports = User;
