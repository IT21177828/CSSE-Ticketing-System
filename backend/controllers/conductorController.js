// Import Mongoose models and the database connection
import busSchema from "../models/busModel.js";
import mongoose from "../db/conn.js";
import { userModel } from "./userController.js";
import busConductorSchema from "../models/busConductor.js";

// Create Mongoose models for 'bus' and 'busConductor' collections
export const busModel = mongoose.model("bus", busSchema);
export const busConductorModel = mongoose.model("busConductor", busConductorSchema);

// Function to assign a conductor to a bus
const assignConductor = (req, res) => {
  // Extract busNumber and conductorId from the request body
  const { busNumber, conductorId } = req.body;

  // Check if both busNumber and conductorId are provided
  if (!busNumber || !conductorId) {
    return res.send({
      message: "Please provide bus number and conductor id",
    });
  }

  // Find the bus with the specified busNumber
  busModel.findOne({ busNumber: busNumber }).then((result) => {
    if (!result) {
      return res.send({
        message: "Bus not found",
      });
    }

    // Update the bus to assign the conductor
    busModel
      .updateOne({ busNumber: busNumber }, { conductId: conductorId })
      .then((result) => {
        if (result.modifiedCount === 0) {
          return res.send("Bus not updated");
        }

        // Update the conductor's busNumber in the busConductor model
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

// Function to get all conductors
const getAllConductors = (req, res) => {
  // Retrieve all users with the role "conductor"
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

// Function to find conductors not assigned to a bus
const findConductorsNotAssigned = (req, res) => {
  // Find conductors in the busConductor model with no bus assignment
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

// Export all the functions as part of the module
export default {
  assignConductor,
  getAllConductors,
  findConductorsNotAssigned,
};
