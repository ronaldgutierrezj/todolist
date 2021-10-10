require('dotenv').config()

//___________________
//Dependencies
//___________________
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');


//___________________
//Database Connection
//___________________
// How to connect to the database either via heroku or locally

const DATABASE_URL = process.env.DATABASE_URL;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
const db = mongoose.connection;
mongoose.connect(DATABASE_URL , { useNewUrlParser: true, useUnifiedTopology: true }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', DATABASE_URL));
db.on('disconnected', () => console.log('mongod disconnected'));

// our model
const {Schema, model} = mongoose
const todoSchema = new Schema({
  name: String,
  category: String,
  comment: String,
  date_to_do: Date,
  due_date: Date,
  completed: Boolean
})

// make a todo model
const Todo = model("Todo", todoSchema)

// Create Object
const app = express();

//___________________
//Middleware
//___________________

app.use(morgan("tiny")) 
app.use(methodOverride("_method")) 
app.use(express.urlencoded({extended: true})) 
app.use(express.static("public"))

////////////////////////
//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
////////////////////////////

//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello');
});

// seed route
app.get("/todos/seed", (req, res) => {

  const startTodos = [
        { name: "Do project 2", category: "School", comment:"create an app then deployed to Heroku", date_to_do:"10/12/2021", due_date:"10/16/2021", completed: false },
        { name: "Get groceries", category: "House", comment:"Go to Whole Food to get groceries for the week", date_to_do:"10/12/2021", due_date:"", completed: true },
        { name: "Look for hotel", category: "Vaction", comment:"Look for a place to stay for trip to Aruba 2022", date_to_do:"10/20/2021", due_date:"12/16/2021", completed: false },
        { name: "Get tickets concert", category: "Entertaiment", comment:"Get ticket for 50 cents concert", date_to_do:"10/12/2021", due_date:"10/20/2021", completed: true },
      ]
  Todo.deleteMany({}, (err, data) => {
    Todo.create(startTodos,(err, data) => {
        
        res.json(data);
      }
    );
  });
});

// Iindex Route

app.get("/todos", (req, res) => {
  Todo.find({}, (err, todos) => {
    res.render("todos/index.ejs", { todos });
  });
});

//___________________
//Listener
//___________________
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('express is listening on:', PORT));