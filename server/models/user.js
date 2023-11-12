const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    userName: {
      required: [true,"What is user name?"],
      type:String
    },
    email: {
      type:String,
      required: [true,"Email is required"],
      
    },
    isActive: Boolean,
    password: {
      required: [true,"Password is required"],
      type:String
    },
  });
  
  // singular lower case
  const Users = mongoose.model("user", usersSchema);
  
  module.exports=Users;