const mongoose = require("mongoose");

const maintenance = new mongoose.Schema(
  {
    impact: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    closeDates: [
      {
        type: String,
      },
    ],
    comment: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Maintenance", maintenance);
