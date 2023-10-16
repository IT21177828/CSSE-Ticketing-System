import express from "express";
import busController from "../controllers/busController.js";

const busRouter = express.Router();

// Route to get all bus details
busRouter.get("/all", busController.viewAllBus);

// Route to get details of one bus by its ID
busRouter.get("/one", busController.viewOneBus);

// Route to get buses that are not assigned a conductor
busRouter.get("/free", busController.getConductorFreeBuses);

// Route to assign a new bus
busRouter.post("/", busController.assignNewBus);

// Route to assign a new bus route
busRouter.post("/route", busController.assignNewBusRoute);

// Route to edit/update existing bus details
busRouter.put("/edit", busController.updateExistingBus);

// Route to set a bus route as crowded
busRouter.put("/crouded", busController.setCroudedState);

// Route to delete a bus by its ID
busRouter.delete("/remove", busController.deleteBus);

export default busRouter;
