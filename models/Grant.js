// server/models/Grant.js
const mongoose = require("mongoose");

const GrantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  fundingAmount: {
    type: Number,
    required: true,
  },
  eligibility: {
    type: String,
    required: true,
  },
  applicationDeadline: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Relating grants to a specific user
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Grant", GrantSchema);
