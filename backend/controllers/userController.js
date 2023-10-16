import busConductorSchema from "../models/busConductor.js";
import mongoose from "../db/conn.js";
import userSchema from "../models/usermodel.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail", // Use the appropriate email service
  auth: {
    user: "", // Replace with your email address
    pass: "", // Replace with your email password or an app-specific password
  },
});

export const userModel = mongoose.model("user", userSchema);
export const busConductorModel = mongoose.model(
  "busConductor",
  busConductorSchema
);

export function hashPasswordNew(password) {
  return crypto
    .pbkdf2Sync(password, "no_salt", 1000, 64, `sha512`)
    .toString(`hex`);
}
//add new user

export function registerUser(req, res) {
  const {
    firstName,
    lastName,
    email,
    passwordHash,
    gender,
    age,
    address,
    contactNo,
  } = req.body;

  let newUser = new userModel();
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;
  newUser.passwordHash = hashPasswordNew(passwordHash);
  newUser.gender = gender;
  newUser.age = age;
  newUser.address = address;
  newUser.userRole = ["user"];
  newUser.contactNo = contactNo;

  newUser
    .save()
    .then((response) => {
      res.send(response);
      console.log("User added successfully");

      const mailOptions = {
        from: "it21180552@my.sliit.lk", // Replace with your email address
        to: newUser.email, // Replace with the recipient's email address
        subject: "Hello from Nodemailer",
        text: "This is a test email sent from Nodemailer.",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
}

// create an admin account
export function adminAccount(req, res) {
  const { firstName, lastName, email, passwordHash, gender, age, address } =
    req.body;

  let newUser = new userModel();
  newUser.firstName = "admin";
  newUser.lastName = "superadmin";
  newUser.email = "admin@gmail.com";
  newUser.passwordHash = hashPasswordNew("0000");
  newUser.gender = "---";
  newUser.age = 12;
  newUser.address = "admin address";
  newUser.userRole = ["admin"];

  newUser
    .save()
    .then((response) => {
      res.send(response);
      console.log("User added successfully");
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
}

// login user

const generateAccessToken = (user) => {
  console.log(user);
  return jwt.sign({ email: user.email, name: user.firstName }, "secret_key", {
    expiresIn: "18m",
  });
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    { email: user.email, name: user.firstName },
    "refresh_secret_key",
    {
      expiresIn: "18m",
    }
  );
};

const loginUser = (req, res) => {
  const { email, passwordHash } = req.body;

  userModel
    .findOne({ email: email })
    .then((user) => {
      // check response is not null
      if (user != null) {
        // check if the user is admin
        if (
          user.email === "admin@gmail.com" &&
          user.passwordHash === hashPasswordNew(passwordHash)
        ) {
          const A_token = generateAccessToken(user);
          const R_token = generateRefreshToken(user);

          // req.session.userId = response._id;

          refreashTokens.push(R_token);

          res.status(200).json({
            message: "Auth successful, admin",
            accessToken: A_token,
            refreshToken: R_token,
            user: user,
          });
        } else {
          if (user.passwordHash == hashPasswordNew(passwordHash)) {
            const A_token = generateAccessToken(user);
            const R_token = generateRefreshToken(user);

            res.status(200).json({
              message: "Auth successful",
              accessToken: A_token,
              refreshToken: R_token,
              user: user,
            });
          } else {
            res.send("Incorrect password");
          }
        }
      } else {
        res.send("User not found");
      }
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
};

//get user details
const userDetails = (req, res) => {
  const email = req.user.email;
  userModel
    .findOne({ email: email })
    .then((user) => {
      // check response is not null
      if (user != null) {
        //send user details
        res.status(200).json({
          message: "User Details",
          user: user,
        });
      } else {
        res.send("User not found");
      }
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
};

//checking age for safe browsing
export function checkAge(req, res) {
  const { age } = req.body;

  if (age < 18) {
    res.send("You are not eligible to register");
    // other code
  } else {
    res.send("You are eligible to register");
  }
}

const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, "secret_key", (err, user) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      console.log(req.body);

      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated");
  }
};
let refreashTokens = [];

const refresh = (req, res) => {
  const refreshToken = req.body.token;

  if (!refreshToken) return res.status(401).json("You are not authenticated!");

  if (!refreashTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh Token Invalied!");
  }

  jwt.verify(refreshToken, "refresh_secret_key", (err, user) => {
    err && console.log(err);
    refreashTokens = refreashTokens.filter((token) => token !== refreshToken);

    const newA_token = generateAccessToken(user);
    const newR_token = generateRefreshToken(user);

    refreashTokens.push(newR_token);
    res.status(200).json({
      accessToken: newA_token,
      refreshToken: newR_token,
    });
  });
};

const showName = (req, res) => {
  console.log("auth work" + req.body.name);
  if (req.user.id === req.params.id || req.user.isAdmin) {
    console.log("admin or user");
  }
  res.send("hellooo");
};

export function updateUser(req, res) {
  const { firstName, lastName, email, passwordHash, gender, age, address } =
    req.body;
}

const getAllUsers = (req, res) => {
  userModel
    .find({userRole: { $nin: ["admin"]}})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.send({
        message: "Error while getting users",
        error: err,
      });
    });
};

const assignUserRole = (req, res) => {
  const { email, userRole } = req.body;

  try {
    userModel
      .findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.send({ message: "User not found" });
        }

        // Check if the user already has the role
        if (user.userRole.includes(userRole)) {
          return res.send({ message: "User already has the assigned role" });
        }

        if (userRole == "conductor") {
          const conductor = new busConductorModel();
          conductor.userID = user._id;
          conductor.conductorName = user.firstName + " " + user.lastName;
          conductor.busNumber = null;
          conductor
            .save()
            .then((result) => {
              console.log("Conductor added successfully");
            })
            .catch((err) => {
              res.send({
                message: "Error while adding conductor",
                error: err,
              });
              throw err;
            });
        }

        userModel
          .updateOne({ email: email }, { $push: { userRole: userRole } })
          .then((result) => {
            if (result.modifiedCount == 0) {
              res.send("User not updated");
            } else {
              console.log("User role assigned successfully");
              res.send("User role assigned successfully");
            }
          })
          .catch((err) => {
            res.send({
              message: "Error while assigning user role",
              error: err,
            });
          });
      })
      .catch((err) => {
        res.send({
          message: "Error while finding user",
          error: err,
        });
      });
  } catch (err) {
    res.send({
      message: "Error while assigning user role",
      error: err,
    });
  }
};

export default {
  verify,
  refresh,
  showName,
  loginUser,
  userDetails,
  assignUserRole,
  getAllUsers,
  adminAccount,
};
