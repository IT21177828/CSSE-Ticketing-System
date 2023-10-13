import express from "express";
import busController from "../controllers/busController.js";

const busRouter = express.Router();

busRouter.get("/all", busController.viewAllBus);
busRouter.get("/one", busController.viewOneBus);
busRouter.get("/free", busController.getConductorFreeBuses);
busRouter.post("/", busController.assignNewBus);
busRouter.post("/route", busController.assignNewBusRoute);
busRouter.put("/edit", busController.updateExistingBus);
busRouter.put("/crouded", busController.setCroudedState);
busRouter.delete("/remove", busController.deleteBus);

export default busRouter;
