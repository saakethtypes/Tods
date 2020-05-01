const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  content_text: {
    type: String,
    minlength: [1, "Task can not be empty"]
  }
});

module.exports = mongoose.model("Content", contentSchema);
