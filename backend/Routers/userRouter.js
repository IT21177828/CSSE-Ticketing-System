import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();
import { registerUser, checkAge } from "../controllers/userController.js";

userRouter.post("/", registerUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/checkAge", checkAge);
userRouter.put("/userRole",  userController.assignUserRole);

userRouter.post("/refresh", userController.verify, userController.refresh);
userRouter.post("/details", userController.verify, userController.userDetails);
userRouter.post("/showName", userController.verify, userController.showName);

export default userRouter;
