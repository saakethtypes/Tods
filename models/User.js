const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    maxlength: 100,
    minlength: [1, "Name can not be empty"],
    required: [true, "Name is required"]
  },
  username: {
    type: String,
    maxlength: 100,
    minlength: [1, "Username can not be empty"],
    required: [true, "Username is required"]
  },
  password: {
    type: String,
    minlength: [5, "Atleast 5 charecters required for a password"],
    required: [true, "Provide a password"]
  },
  user_todos: [mongoose.Schema.Types.ObjectId],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  user_theme:{
    type:[String],
    default:["black","cornsilk","#ca7df9"]
  }
});

module.exports = mongoose.model("User", UserSchema);
