const mongoose = require("mongoose");
const Content = require("../models/Content");

const TodoSchema = new mongoose.Schema({
  task: {
    type: String,
    maxlength: 100,
    minlength: [1, "Task can not be empty"],
    required: [true, "Task name is required"]
  },
  content: [Content.schema],
  status: {
    type: Boolean,
    default: false
  },
  star: {
    type: Boolean,
    default: false
  },
  importance: {
    type: Number,
    default: 5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Todo", TodoSchema);
