require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const TodoRouter = require("./controllers/todo")




// Create Object
const app = express();

//___________________
//Middleware
//___________________

app.use(morgan("tiny")); 
app.use(methodOverride("_method")); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static("public"));
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project
app.use("/todos", TodoRouter)

////////////////////////////

//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello');
});

//___________________
//Listener
//___________________
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('express is listening on:', PORT));