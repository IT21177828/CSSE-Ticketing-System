import busRouter from "./Routers/busRouter.js";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import qrRouter from "./Routers/qrRouter.js";
import userRouter from "./Routers/userRouter.js";
import conductorRouter from "./Routers/conduntorRouter.js";
import transactionRouter from "./Routers/transactionRouter.js";
import DatabaseSingleton from "./db/MongoSingleton.js";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

DatabaseSingleton.instance;

// Routes
app.use("/users", userRouter);
app.use("/qr", qrRouter);
app.use("/bus", busRouter);
app.use("/conductor", conductorRouter);
app.use("/transaction", transactionRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
