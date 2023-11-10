const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    items: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "menu" },
        serveHour: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    serveTime: {
      serveDate: { type: String },
      serveHour: { type: String },
      required,
    },
    price: {
      type: Number,
      required,
    },
  },
  {
    timestamps: true,
  }
);
