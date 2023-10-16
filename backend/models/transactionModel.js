import mongoose from "../db/conn.js";

const transaction = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  deductedAmount: {
    type: Number,
    required: true,
  },
  transactionDateTime: {
    type: Date,
    default: Date.now,
  },
  busNumber: {
    type: String,
    required: true,
  },
  conductorName: {
    type: String,
    required: true,
  },
});
export default transaction;
