const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discreption: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
