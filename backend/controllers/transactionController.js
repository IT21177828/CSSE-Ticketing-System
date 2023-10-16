import mongoose from "../db/conn.js";
import userSchema from "../models/usermodel.js";
import transactionSchema from "../models/transactionModel.js";

export const userModel = mongoose.model("user", userSchema);
export const transactionModel = mongoose.model(
  "transaction",
  transactionSchema
);

const deductBusFare = async (req, res) => {
  const { userID, amount, conductorName, busNumber } = req.body;

  try {
    userModel.findOne({ _id: userID }).then((result) => {
      if (!result) {
        return res.send({
          message: "User not found",
        });
      }

      if (result.accountBalance < amount) {
        return res.send({
          message: "Insufficient balance",
        });
      }

      userModel
        .updateOne(
          { _id: userID },
          { accountBalance: parseFloat(result.accountBalance) - amount }
        )
        .then((result) => {
          console.log("User account topup successfully");

          const newTransaction = new transactionModel();
          newTransaction.userID = userID;
          newTransaction.deductedAmount = amount;
          newTransaction.busNumber = busNumber;
          newTransaction.conductorName = conductorName;

          newTransaction
            .save()
            .then((result) => {
              console.log("Transaction saved successfully");
              res.send({
                message: "Transaction happened successfully",
              });
            })
            .catch((err) => {
              console.log("Error saving transaction");
              res.send({
                message: "Error while transaction process!",
                error: err,
              });
            });
        })
        .catch((err) => {
          res.send({
            message: "Error while transaction process!",
            error: err,
          });
        });
    });
  } catch (error) {
    res.status(500).send({ message: "Error deducting bus fare" });
  }
};

// This function is used to top up the user's account balance

const topUpUserAccount = async (req, res) => {
  const { userID, amount } = req.body;

  try {
    const user = await userModel.findById(userID);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.accountBalance = parseFloat(user.accountBalance) + amount;

    await user.save();

    res.status(200).send({ message: "User account topped up successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error topping up user account" });
  }
};

export default {
  topUpUserAccount,
  deductBusFare,
};
