const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    name: String,
    country: String,
    probability: Number,
    status: String,
    syncedToCRM: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
