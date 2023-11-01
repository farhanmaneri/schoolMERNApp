const express = require('express');
const Contact = require('../models/contact');
const nodemailer = require('nodemailer');

let getContact =  async (req, res) => {
    try {
      const contact = await Contact.find({});  
      res.status(200).json({ data: contact });
      // console.log(contact);
    } catch (error) {
      res.status(500).send({ error: error.toString() });
    }
  }

    const transporter =  nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'farhanmaneri@gmail.com',
        pass: 'mxmkweulmvmtroex'
      }
    })

 
let addContact = async(req, res) => {
    try {
      const { name, email } = req.body;
  
      const contact = new Contact({ name, email });
      const response = await contact.save();
      // for email recipient
      const emailResponse = await transporter.sendMail({
        from: 'farhanmaneri@gmail.com',
        to: email,
        subject: "Hello "+name+" your message Received | HELLENA BROWN",
          text: "Hello , " + name + " your message is received. Details: " 
          // html: '<img src="https://i0.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png?fit=422%2C360&ssl=1"><br><br><b>Hello ,'+name+' your message is received.</b>'+'Details:<u>'+message+'</u>'
        });
        console.log(emailResponse);

      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).send({ error: error.toString() });
    }
}

  module.exports = {getContact, addContact};