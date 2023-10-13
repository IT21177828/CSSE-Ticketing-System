import mongoose from "../db/conn.js";

const qrCode = new mongoose.Schema({
  userID : {
    type: String,
    required: true,
    unique: true,
  },
  qrCode : {
    type: String,
    required: true,
    unique: true,
  },
  issuedDate : {
    type: Date,
    required: true,
  },

});
export default qrCode;
