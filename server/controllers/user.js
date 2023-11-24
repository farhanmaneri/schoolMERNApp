const Users = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose= require("mongoose");

let getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).send({ data: users });
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};
let createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);
    const user = new Users({ userName, email, password: hashedPassword });

    const response = await user.save();
    res
      .status(200)
      .send({ data: response, message: "User is created successfully" });
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};

let userAuthentication = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    // console.log(user);
    let compareHashResponse = await bcrypt.compare(password, user.password);
// console.log(compareHashResponse)
    if (compareHashResponse) {
      // let tempUser = {};
      // tempUser.email = user.email;
      // tempUser._id = user._id;

      const token = jwt.sign(
        { id: user._id, role: "admin" },
        "thisismysecret",
        { algorithm: "HS256", expiresIn: 256 }
      );
      return res.status(200).send({ data: { email: email, token: token } });
      // return res.status(200).send({ data: tempUser });
    } else {
      return res.status(401).send({ message: "Invalid Password" });
    }
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};
let changePassword = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized user i.e. token not found" });
    }

    const decodedToken = jwt.verify(token, "thisismysecret");
    if (!decodedToken) {
      res.status(401).json({ error: "Token is expired" });
    } else {
      const _id = decodedToken.id;
      const role = decodedToken.role;
      console.log(role);

      const ObjectId = mongoose.Types.ObjectId;

      const user = await Users.findOne({ email, _id: new ObjectId(_id) });
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      let compareHashResponse = await bcrypt.compare(password, user.password);
      if (compareHashResponse) {
        let computedHash = await bcrypt.hash(newPassword, 10);
        user.password = computedHash;
        user
          .save()
          .then(() => {
            return res.status(200).json({ message: "Password is updated" });
          })
          .catch((error) => {
            return res.status(500).send({ error: error.toString() });
          });
      } else {
        return res.status(401).send({ message: "Current password is invalid" });
      }
    }
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};


// Todo : Update product

module.exports = { createUser, getUsers, userAuthentication,changePassword };
