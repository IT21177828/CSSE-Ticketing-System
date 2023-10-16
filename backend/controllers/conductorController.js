import busSchema from "../models/busModel.js";
import mongoose from "../db/conn.js";
import { userModel } from "./userController.js";
import busConductorSchema from "../models/busConductor.js";

export const busModel = mongoose.model("bus", busSchema);
export const busConductorModel = mongoose.model(
  "busConductor",
  busConductorSchema
);

const assignConductor = (req, res) => {
  const { busNumber, conductorId } = req.body;

  if (!busNumber || !conductorId) {
    return res.send({
      message: "Please provide bus number and conductor id",
    });
  }

  busModel.findOne({ busNumber: busNumber }).then((result) => {
    if (!result) {
      return res.send({
        message: "Bus not found",
      });
    }

    busModel
      .updateOne({ busNumber: busNumber }, { conductId: conductorId })
      .then((result) => {
        if (result.modifiedCount == 0) {
          return res.send("Bus not updated");
        }
        busConductorModel
          .updateOne({ userID: conductorId }, { busNumber: busNumber })
          .then((result) => {
            console.log("Conductor assigned successfully");
            res.send("Conductor assigned successfully");
          })
          .catch((err) => {
            res.send({
              message: "Error while assigning bus to conductor",
              error: err,
            });
          });
      })
      .catch((err) => {
        res.send({
          message: "Error while assigning conductor to bus",
          error: err,
        });
      });
  });
};

const getAllConductors = (req, res) => {
  userModel
    .find({ userRole: { $all: ["conductor"] } })
    .then((result) => {
      console.log("Conductors retrieved successfully");
      res.send(result);
    })
    .catch((err) => {
      res.send({
        message: "Error while retrieving conductors",
        error: err,
      });
    });
};

const findConductorsNotAssigned = (req, res) => {
  busConductorModel
    .find({ busNumber: null })
    .then((result) => {
      console.log("Conductors retrieved successfully");
      res.send(result);
    })
    .catch((err) => {
      res.send({
        message: "Error while retrieving conductors",
        error: err,
      });
    });
};

export default {
  assignConductor,
  getAllConductors,
  findConductorsNotAssigned,
};
