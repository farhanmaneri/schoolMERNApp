const express = require("express");
const Leave = require("../models/leave");

let getLeave = async (req, res) => {
  try {
    const leave = await Leave.find({});
    res.status(200).json({ data: leave });
    console.log("testing",leave);
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};

let addLeave = async (req, res) => {
  try {
    const { description } = req.body;

    const leave = new Leave({ description});
    const response = await leave.save();

  
    
    res.status(200).json({ data: response }); // Send the response after all email sending is done
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};


module.exports = { getLeave, addLeave};
