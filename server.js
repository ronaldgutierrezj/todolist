require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const Todo = require("./models/todo")




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

// Index Route

app.get("/todos", (req, res) => {
  Todo.find({}, (err, todos) => {
    res.render("todos/index.ejs", { todos });
  });
});

// New Route
app.get("/todos/new", (req, res) => {
  res.render("todos/new.ejs")
});

app.post("/todos", (req, res) => {
  
  req.body.completed = req.body.completed === "on" ? true : false
 
  Todo.create(req.body, (err, todo) => {
      // redirect the user back to the main fruits page after fruit created
      res.redirect("/todos")
  })
});

// Delete Route
app.delete("/todos/:id", (req, res) => {
  const id = req.params.id
  Todo.findByIdAndRemove(id, (err, todo) => {
      // redirect user back to index page
      res.redirect("/todos")
  })
});

// edit route
app.get("/todos/:id/edit", (req, res) => {
  
  const id = req.params.id
  Todo.findById(id, (err, todo) => {
      res.render("todos/edit.ejs", {todo})
  })
});

//update route
app.put("/todos/:id", (req, res) => {
  const id = req.params.id
  req.body.completed = req.body.completed === "on" ? true : false
  Todo.findByIdAndUpdate(id, req.body, {new: true}, (err, todo) => {
      res.redirect("/todos")
  })
});


// Show Route

app.get("/todos/:id", (req, res) => {
  // get the id from params
  const id = req.params.id

  // find the particular Todo from the database
  Todo.findById(id, (err, todo) => {
      // render the template with the data from the database
      res.render("todos/show.ejs", {todo})
  })
})

//___________________
//Listener
//___________________
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('express is listening on:', PORT));