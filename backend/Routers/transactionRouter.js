import express from "express";
import busController from "../controllers/transactionController.js";

const transactionRouter = express.Router();

transactionRouter.post("/deductBusFare", busController.deductBusFare);
transactionRouter.post("/topUpUserAccount", busController.topUpUserAccount);

export default transactionRouter;
