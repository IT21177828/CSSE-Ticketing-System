import express from "express";
import busController from "../controllers/busController.js";

const busRouter = express.Router();

busRouter.get("/all", busController.viewAllBus);
busRouter.get("/one", busController.viewOneBus);
busRouter.post("/", busController.assignNewBus);
busRouter.put("/edit", busController.updateExistingBus);
busRouter.delete("/remove", busController.deleteBus);

export default busRouter;
