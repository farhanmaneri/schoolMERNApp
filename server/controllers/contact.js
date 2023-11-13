const express = require("express");
const Contact = require("../models/contact");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");

let getContact = async (req, res) => {
  try {
    const contact = await Contact.find({});
    res.status(200).json({ data: contact });
    console.log("testing",contact);
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "farhanmaneri@gmail.com",
    pass: "mxmkweulmvmtroex",
  },
});

let addContact = async (req, res) => {
  try {
    const { name, email,description } = req.body;

    const contact = new Contact({ name, email, description});
    const response = await contact.save();

    const handlebarOptions = {
      viewEngine: {
        partialsDir: path.resolve("./views/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views/"),
    };
    transporter.use("compile", hbs(handlebarOptions));

    const user = contact; 
      if (user.email && user.email.trim() !== '') {
        const mailOptions = {
          from: '"Royal Fabrics" farhanmaneri@gmail.com',
          template: "email",
          to: user.email,
          subject: `Welcome to Royal Fabrics, ${user.name}`,
          context: {
            name: user.name,
            company: "Royal Fabrics",
          },
        };
        try {
          await transporter.sendMail(mailOptions);
        } catch (error) {
          console.log(`Nodemailer error sending email to ${user.email}`, error);
        }
      } else {
        console.log(`No valid email found for user: ${user.name}`);
      }
    // }
    
    res.status(200).json({ data: response }); // Send the response after all email sending is done
  } catch (error) {
    res.status(500).send({ error: error.toString() });
  }
};


module.exports = { getContact, addContact };
