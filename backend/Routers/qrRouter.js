import express from "express";
import topUpUserAccount from "../controllers/qrController.js";

const qrRouter = express.Router();

qrRouter.post("/recreateQRCode", topUpUserAccount.recreateQRCode);
qrRouter.post("/createQR", topUpUserAccount.createQRCode);
qrRouter.post("/getQRCode", topUpUserAccount.getQrcode)

export default qrRouter;
