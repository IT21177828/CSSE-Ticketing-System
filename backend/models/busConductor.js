import mongoose from "../db/conn.js";

const busConductor = new mongoose.Schema({
  userID : {
    type: String,
    required: true,
  },
  busNumber : {
    type: String,
    required: null,
  },
});
export default busConductor;
