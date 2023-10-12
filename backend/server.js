import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./Routers/userRouter.js";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Routes
app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
