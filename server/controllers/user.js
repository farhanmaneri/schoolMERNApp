const mongoose = require("mongoose");
const Users = require("../models/user");
const bcrypt = require("bcrypt");

let getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).send({ data: users });
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};

let getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    console.log(user);
    let compareHashResponse = await bcrypt.compare(password, user.password);

    if (compareHashResponse) {
      let tempUser = {};
      tempUser.email = user.email;
      tempUser._id = user._id;

      return res.status(200).send({ data: tempUser });
    } else {
      return res.status(401).send({ message: "Invalid Password" });
    }
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

// Todo : Update product

module.exports = { createUser, getUsers, getUser };
