const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  
  firstname: { type: String, required: true },
  lastname: { type: String, default: null },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  hobbies: { type: String, required:true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
