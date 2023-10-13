import mongoose from "../db/conn.js";

const bus = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  driverId: {
    type: String,
    default: null,
  },
  conductId: {
    type: String,
    default: null,
  },
  routeName: {
    type: String,
    required: true,
  },
});
export default bus;
