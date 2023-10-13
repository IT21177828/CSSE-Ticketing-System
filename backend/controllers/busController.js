import busSchema from "../models/busModel.js";
import busRouteSchema from "../models/busRouteModel.js";
import mongoose from "../db/conn.js";

export const busModel = mongoose.model("bus", busSchema);
export const busRouteModel = mongoose.model("busRoute", busRouteSchema);

//assigninb bus to a driver and a conduct
const assignNewBus = (req, res) => {
  const {
    busNumber,
    driverId,
    conductId,
    capacity,
    routeName,
    busName,
    rootDistance,
  } = req.body;

  let newBus = new busModel();
  newBus.busNumber = busNumber;
  newBus.driverId = driverId;
  newBus.conductId = conductId;
  newBus.capacity = capacity;
  newBus.routeName = routeName;
  newBus.busName = busName;
  newBus.rootDistance = rootDistance;

  newBus
    .save()
    .then((result) => {
      const newBusRoute = new busRouteModel();
      newBusRoute.routeName = routeName;
      newBusRoute
        .save()
        .then((result) => {
          res.send("New bus Added successsfully");
        })
        .catch((err) => {
          res.send({
            message: "Error while creating bus route",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: "Error while creating bus",
        error: err,
      });
    });
};

const assignNewBusRoute = (req, res) => {
  const { routeName } = req.body;

  busRouteModel.findOne({ routeName: routeName }).then((result) => {
    if (result) {
      return res.send({
        message: "Bus route already exists",
      });
    }
    let newBusRoute = new busRouteModel();
    newBusRoute.routeName = routeName;

    newBusRoute
      .save()
      .then((result) => {
        res.send("New bus route Added successsfully");
      })
      .catch((err) => {
        res.send({
          message: "Error while creating bus route",
          error: err,
        });
      });
  });
};

//updating existing bus details
const updateExistingBus = (req, res) => {
  const {
    busNumber,
    driverId,
    conductId,
    capacity,
    routeName,
    busName,
    rootDistance,
  } = req.body;
  busModel
    .updateOne(
      { busNumber: busNumber },
      {
        busName: busName,
        driverId: driverId,
        conductId: conductId,
        capacity: capacity,
        routeName: routeName,
        rootDistance: rootDistance,
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

const setCroudedState = (req, res) => {
  const { routeName } = req.body;

  if (!routeName) {
    return res.send({
      message: "Please provide route name",
    });
  }

  busRouteModel
    .updateOne({ routeName: routeName }, { routeStatus: "overcrouded" })
    .then((result) => {
      if (result.modifiedCount == 0) {
        return res.send({
          message: "No bus route found",
        });
      }
      console.log("Success fully updated a bus");
      res.send({ message: "Success fully updated a bus" });
    })
    .catch((err) => {
      res.send({
        message: "Error while findding a bus",
        error: err,
      });
    });
};

const getConductorFreeBuses = (req, res) => {
  busModel
    .find({ conductId: null })
    .then((result) => {
      console.log("Success fully found busses");
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
  getConductorFreeBuses,
  assignNewBusRoute,
  setCroudedState,
};
