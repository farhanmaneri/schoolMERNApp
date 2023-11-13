const express = require("express");
const multer = require("multer");
const cloudinary = require('cloudinary');
require('dotenv').config()



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const File = require("../models/upload");
const path = require('path')
const fs = require('fs');

var dir = './uploads/profiles/';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}

let addUpload =  async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({message:"No file to upload"})
      }
    // Write the buffer to a temporary file

    const tempFilePath = path.join(__dirname, '../uploads/profiles/', req.file.originalname);
    fs.writeFileSync(tempFilePath, req.file.buffer);

    // Upload the temporary file to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, { resource_type: 'auto' });
    // Save file reference in MongoDB
    const newFile = new File({
      filename: req.file.originalname,
      url: result.secure_url
    });
    newFile.save();    
    // Remove the temporary file
    // fs.unlinkSync(tempFilePath);
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error });
  }
};

module.exports =  addUpload;
