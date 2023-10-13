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
    default: null,
  },
  age: {
    type: Number,
    default: null,
  },
  address: {
    type: String,
    default: null,
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
  contactNo: {
    type: String,
    default: null,
  },
});
export default user;
