const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({
   
    description: String
  });
  
  const Leave = mongoose.model("leave", leaveSchema);
  
  module.exports=Leave;