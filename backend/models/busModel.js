import mongoose from "../db/conn.js";

const bus = new mongoose.Schema({
  busName: {
    type: String,
    required: true,
  },
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
  rootDistance: {
    type: Number,
    required: true,
  },
});
export default bus;
