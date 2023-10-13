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
    required: true,
  },
  conductId: {
    type: String,
    required: true,
  },
  routeStart: {
    type: String,
    required: true,
  },
  routeEnd: {
    type: String,
    required: true,
  },
});
export default bus;
