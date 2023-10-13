import express from "express";
import topUpUserAccount from "../controllers/topUpUserAccount.js";

const qrRouter = express.Router();

qrRouter.post("/topUpUserAccount", topUpUserAccount.topUpUserAccount);
qrRouter.post("/recreateQRCode", topUpUserAccount.recreateQRCode);
qrRouter.post("/createQR", topUpUserAccount.createQRCode);

export default qrRouter;
