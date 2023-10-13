import busSchema from "../models/busModel.js";
import mongoose from "../db/conn.js";

export const busModel = mongoose.model("bus", busSchema);

//assigninb bus to a driver and a conduct
const assignNewBus = (req, res) => {
  const { busNumber, driverId, conductId, capacity, routeStart, routeEnd } =
    req.body;

  let newBus = new busModel();
  newBus.busNumber = busNumber;
  newBus.driverId = driverId;
  newBus.conductId = conductId;
  newBus.capacity = capacity;
  newBus.routeStart = routeStart;
  newBus.routeEnd = routeEnd;

  newBus
    .save()
    .then((result) => {
      console.log("New bus Added successsfully");
      res.send("New bus Added successsfully");
    })
    .catch((err) => {
      res.send({
        message: "Error while creating bus",
        error: err,
      });
    });
};

//updating existing bus details
const updateExistingBus = (req, res) => {
  const { busNumber, driverId, conductId, capacity, routeStart, routeEnd } =
    req.body;
  busModel
    .updateOne(
      { busNumber: busNumber },
      {
        driverId: driverId,
        conductId: conductId,
        capacity: capacity,
        routeStart: routeStart,
        routeEnd: routeEnd,
      }
    )
    .then((result) => {
      console.log("Bus details updated successfully");
      res.send("Bus details updated successfully");
    })
    .catch((err) => {
      res.send({
        message: "Error while updating bus details",
        error: err,
      });
    });
};

//view all bus details
const viewAllBus = (req, res) => {
  busModel
    .find()
    .then((result) => {
      console.log("Find all successfull");
      res.send(result);
    })
    .catch((err) => {
      res.send({
        message: "Error while finding all bus",
        error: err,
      });
    });
};

//view one bus details
const viewOneBus = (req, res) => {
  const busNumber = req.query.id;

  busModel
    .findOne({ busNumber: busNumber })
    .then((result) => {
      console.log("Success fully found a bus");
      if (result == null) {
        res.send({
          message: "No bus found",
        });
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      res.send({
        message: "Error while findding a bus",
        error: err,
      });
    });
};

const deleteBus = (req, res) => {
  const busNumber = req.query.id;

  busModel
    .findOneAndDelete({ busNumber: busNumber })
    .then((result) => {
      console.log("Success fully deleted a bus");
      if (result == null) {
        res.send({
          message: "No bus found",
        });
      } else {
        res.send(result);
      }
    })
    .catch((err) => {
      res.send({
        message: "Error while findding a bus",
        error: err,
      });
    });
};

export default {
  assignNewBus,
  updateExistingBus,
  viewAllBus,
  viewOneBus,
  deleteBus,
};
