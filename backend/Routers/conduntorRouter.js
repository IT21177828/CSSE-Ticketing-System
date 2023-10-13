import express from "express";
import conductorController from "../controllers/conductorController.js";

const conductorRouter = express.Router();

conductorRouter.get("/all", conductorController.getAllConductors);
conductorRouter.get("/notAssigned", conductorController.findConductorsNotAssigned);
conductorRouter.post("/assign",  conductorController.assignConductor);

export default conductorRouter;
