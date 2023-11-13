const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    items: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
        serveHour: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    serveTime: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", OrdersSchema);
