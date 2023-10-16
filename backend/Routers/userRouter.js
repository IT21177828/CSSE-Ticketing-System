import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

// Route to register a new user
userRouter.post("/", userController.registerUser);

// Route to log in a user
userRouter.post("/login", userController.loginUser);

// Route to check the age of a user
userRouter.get("/checkAge", userController.checkAge);

// Route to assign user roles
userRouter.put("/userRole", userController.assignUserRole);

// Route to get all users
userRouter.get("/all", userController.getAllUsers);

// Route to refresh authentication token
userRouter.post("/refresh", userController.verify, userController.refresh);

// Route to get user details
userRouter.post("/details", userController.verify, userController.userDetails);

// Route to show the user's name
userRouter.post("/showName", userController.verify, userController.showName);

// Route to create an admin account
userRouter.post("/adminCreate", userController.adminAccount);

export default userRouter;
