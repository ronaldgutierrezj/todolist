//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection")

////////////////////////////////////////////////
// Define Model
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// our model

const todoSchema = new Schema({
  name: String,
  category: String,
  comment: String,
  date_to_do: Date,
  due_date: Date,
  completed: Boolean,
  username: String
})

// make a todo model
const Todo = model("Todo", todoSchema)

module.exports = Todo