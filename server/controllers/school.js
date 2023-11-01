const express = require('express');
const Schools = require('../models/school');

let getSchools = async (req, res) => {
    try {
      const schools = await Schools.find();
      res.status(200).send({ data: schools });
    } catch (error) {
      res.status(500).send({ error: error.toString() });
    }
  }
  
 let getSchool= async (req, res) => {
    try {
      const id = req.params.id;
  
      if(! mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({message:"Invalid school ID"});
      }
  
      const school = await Schools.findOne({ _id: id });
      if (school == null) {
        return res.status(404).send({ message: "No school exist against this id" });
      } 
        res.status(200).send(school);
      
    } catch (error) {
      res.status(500).send({ error: error.toString() });
    }
  }
  
 let deleteSchool = async (req, res) => {
    try {
      const id = req.params.id;
  
      if(! mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({message:"Invalid school ID"});
      }
    
      // Todo : Find school before deleting
  
      const school = await Schools.deleteOne({ _id: id });
      console.log(school);
      if (school.deletedCount == 0) {
        return res.status(404).send({ message: "No school exist against this id" });
      } 
      
      res.status(200).send({message: "school deleted successfully"});
  
      // Todo: send school in response 
      // res.status(200).send({ data:school, message: "school deleted successfully"});
      
    } catch (error) {
      res.status(500).send({ error: error.toString() });
    }
  };

  let  addSchool = async (req, res) => {
    try {   
     const shcoolData=  req.body
     console.log(shcoolData)
     const school =new Schools(shcoolData)
     const response= await school.save()
     res.status(200).send({ data:response, message: "School saved successfully"})
      
    } catch (error) {
      res.status(500).send({ error: error.toString() });
    }
  }
  module.exports = {getSchools, getSchool, addSchool, deleteSchool}