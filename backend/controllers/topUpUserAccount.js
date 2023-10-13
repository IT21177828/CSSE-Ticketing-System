import mongoose from "../db/conn.js";
import qrCode from "../models/qrcodeModel.js";
import QRcode from "qrcode";
import userSchema from "../models/usermodel.js";

export const qrCodeModel = mongoose.model("qrCode", qrCode);
export const userModel = mongoose.model("user", userSchema);

// This function is used to top up the user's account balance

const topUpUserAccount = async (req, res) => {
  const { userID, amount } = req.body;

  try {
    const user = await userModel.findById(userID);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.accountBalance = user.accountBalance + amount;

    await user.save();

    res.status(200).send({ message: "User account topped up successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error topping up user account" });
  }
};

//create a new qr code for the user
function generateNewQR(qrID, callback) {
  QRcode.toDataURL(qrID, function (err, url) {
    if (err) {
      console.log({ qrcodeerror: err });
      callback(err, null); // Pass the error to the callback
    } else {
      callback(null, url); // Pass the URL to the callback
    }
  });
}

const createQRCode = async (req, res) => {
  const { userID } = req.body;
  try {
    userModel
      .findById({ _id: userID })
      .then((response) => {
        if (!response) {
          return res.status(404).send({ message: "User not found" });
        }
        const newqr = new qrCodeModel();
        newqr._id = new mongoose.Types.ObjectId();
        const objId = newqr._id;
        newqr.qrCode = objId;
        newqr.userID = userID;
        newqr.issuedDate = Date.now();
        newqr
          .save()
          .then((result) => {
            userModel
              .updateOne({ _id: response._id }, { qrCode: objId })
              .then((upres) => {
                console.log("User updated successfully");
                generateNewQR(objId.toString(), (error, qrUrl) => {
                  if (error) {
                    console.error("Error generating QR code:", error);
                    res
                      .status(500)
                      .send({ message: "Error while generating QR code" });
                  } else {
                    console.log("Generated QR code URL:", qrUrl);
                    res
                      .status(200)
                      .send({ message: "QR code generated successfully" });
                  }
                });
              })
              .catch((err) => {
                console.log({ error: err });
                res
                  .status(500)
                  .send({ message: "Error while updating QR code" });
              });
          })
          .catch((err) => {
            if (err.code === 11000) {
              console.log("Qr code already exists");
              res.status(500).send({ message: "QR code already exists" });
            } else {
              res.status(500).send({ message: "Error while creating QR code" });
            }
          });
      })
      .catch((err) => {
        console.log({ error: err });
        res.status(500).send({ message: "Error while finding user" });
      });
  } catch (error) {
    res.status(500).send({ message: "Error generating QR code" });
  }
};

//recreate a new qr code for the user

const recreateQRCode = async (req, res) => {
  const { userID } = req.body;

  try {
    const user = await userModel.findById(userID);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    const existingqr = user.qrCode;

    //check whether the qr code exists in the qr code collection
    await qrCodeModel
      .exists({ _id: existingqr })
      .then((response) => {
        console.log({ qrCodefound: existingqr });
        qrCodeModel
          .findOneAndDelete({ _id: existingqr })
          .then((response) => {
            console.log(response);
            console.log("QR code deleted successfully");

            const newqr = new qrCodeModel();
            newqr._id = new mongoose.Types.ObjectId();
            const objId = newqr._id;
            newqr.qrCode = objId;
            newqr.userID = userID;
            newqr.issuedDate = Date.now();

            newqr
              .save()
              .then((createres) => {
                userModel
                  .updateOne(
                    { _id: user._id },
                    {
                      qrCode: newqr._id,
                    }
                  )
                  .then((upres) => {
                    console.log("User updated successfully");

                    generateNewQR(objId.toString(), (error, qrUrl) => {
                      if (error) {
                        console.error("Error generating QR code:", error);
                        res
                          .status(500)
                          .send({ message: "Error while generating QR code" });
                      } else {
                        console.log("Generated QR code URL:", qrUrl);
                        res
                          .status(200)
                          .send({ message: "QR code generated successfully" });
                      }
                    });
                  })
                  .catch((err) => {
                    console.log({ error2: err });
                    res
                      .status(500)
                      .send({ message: "Error while updating QR code" });
                  });
              })
              .catch((err) => {
                console.log({ error33: err });
                res
                  .status(500)
                  .send({ message: "Error while creating new QR code" });
              });
          })
          .catch((err) => {
            console.log({ error3: err });
            res.status(500).send({ message: "Error while deleting QR code" });
          });
      })
      .catch((err) => {
        console.log("QR code not found");
        console.log({ noqr: err });
      });
  } catch (error) {
    console.log({ error1: error });
    res.status(500).send({ message: "Error generating QR code" });
  }
};

export default {
  topUpUserAccount,
  recreateQRCode,
  createQRCode,
};
