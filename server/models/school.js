const mongoose = require('mongoose')

const schoolsSchema = new mongoose.Schema({
    schoolName: {
      required: [true,"What is school title?"],
      type:String
    },
    emisCode: {
      type:Number,
      required: [true,"EMIS Code is required"],
      min:[1,"Value can't be negative"]
    },
    teachers:{
      type:Array,
    }
    
  });
  const Schools = mongoose.model("school", schoolsSchema);

  module.exports=Schools;