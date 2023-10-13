import { ObjectId } from "mongodb";
import mongoose from "../db/conn.js";

const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  userRole: {
    type: [String],
    required: true,
  },
  qrCode: {
    type: String,
    default: null,
  },
  accountBalance: {
    type: Number,
    default: 0,
  },
});
export default user;
