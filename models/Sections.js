const mongoose = require("mongoose");
const Todo = require("../models/Todo");

const SectionSchema = new mongoose.Schema({
  section_title: {
    type: String,
    required: [true, "Section title is required"],
    maxlength: 20
  },
  contained_todos: [Todo.schema]
});

module.exports = mongoose.model("Section", SectionSchema);
