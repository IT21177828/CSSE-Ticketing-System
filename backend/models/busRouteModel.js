import mongoose from "../db/conn.js";

const busRoute = new mongoose.Schema({
  routeName : {
    type: String,
    required: true,
  },
  routeStatus : {
    type: String,
    default: "normal",
  },
});
export default busRoute;
