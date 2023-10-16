import mongoose from "../db/conn.js";
import userSchema from "../models/usermodel.js";
import transactionSchema from "../models/transactionModel.js";

// Creating instances of the User and Transaction models
export const userModel = mongoose.model("user", userSchema);
export const transactionModel = mongoose.model(
  "transaction",
  transactionSchema
);

// Deducts bus fare from a user's account
const deductBusFare = async (req, res) => {
  try {
    // Extracting data from the request body
    const { userID, amount, conductorName, busNumber } = req.body;

    // Finding the user by ID
    userModel.findOne({ _id: userID }).then((result) => {
      // If the user is not found, send an error response
      if (!result) {
        return res.send({
          message: "User not found",
        });
      }

      // If the user has insufficient balance, send an error response
      if (result.accountBalance < amount) {
        return res.send({
          message: "Insufficient balance",
        });
      }

      // Updating the user's account balance
      userModel
        .updateOne(
          { _id: userID },
          { accountBalance: parseFloat(result.accountBalance) - amount }
        )
        .then((result) => {
          // Log successful user account top-up
          console.log("User account top-up successful");

          // Creating a new transaction record
          const newTransaction = new transactionModel();
          newTransaction.userID = userID;
          newTransaction.deductedAmount = amount;
          newTransaction.busNumber = busNumber;
          newTransaction.conductorName = conductorName;

          // Saving the transaction record
          newTransaction
            .save()
            .then((result) => {
              // Log successful transaction save
              console.log("Transaction saved successfully");
              res.send({
                message: "Transaction happened successfully",
              });
            })
            .catch((err) => {
              // Log error saving transaction
              console.log("Error saving transaction");
              res.send({
                message: "Error while transaction process!",
                error: err,
              });
            });
        })
        .catch((err) => {
          // Send an error response if there's an issue with updating the user's account
          res.send({
            message: "Error while transaction process!",
            error: err,
          });
        });
    });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).send({ message: "Error deducting bus fare" });
  }
};

// Tops up the user's account balance
const topUpUserAccount = async (req, res) => {
  try {
    // Extracting data from the request body
    const { userID, amount } = req.body;

    // Finding the user by ID
    const user = await userModel.findById(userID);
    // If the user is not found, send a 404 response
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Topping up the user's account balance
    user.accountBalance = parseFloat(user.accountBalance) + amount;

    // Saving the updated user object
    await user.save();

    // Sending a success response
    res.status(200).send({ message: "User account topped up successfully" });
  } catch (error) {
    // Handle unexpected errors
    res.status(500).send({ message: "Error topping up user account" });
  }
};

// Exporting the functions as part of a module
export default {
  topUpUserAccount,
  deductBusFare,
};
