import mongoose from "../db/conn.js";
import userSchema from "../models/usermodel.js";

export const userModel = mongoose.model("user", userSchema);

const deductBusFare = async (req, res) => {
  const { userID, amount } = req.body;

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
          res.send({ message: "User account topup successfully" });
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
