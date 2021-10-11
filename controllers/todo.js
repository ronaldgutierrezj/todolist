////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Todo = require("../models/todo")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()
////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/login");
  }
});

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// seed route
router.get("/seed", (req, res) => {

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
  
  router.get("/", (req, res) => {
    Todo.find({username: req.session.username}, (err, todos) => {
      res.render("todos/index.ejs", { todos });
    });
  });
  
  // New Route
  router.get("/new", (req, res) => {
    res.render("todos/new.ejs")
  });
  
  router.post("/", (req, res) => {
    req.body.completed = req.body.completed === "on" ? true : false
    req.body.username = req.session.username
    Todo.create(req.body, (err, todo) => {
        // redirect the user back to the main fruits page after fruit created
        res.redirect("/todos")
    })
  });
  
  // Delete Route
  router.delete("/:id", (req, res) => {
    const id = req.params.id
    Todo.findByIdAndRemove(id, (err, todo) => {
        // redirect user back to index page
        res.redirect("/todos")
    })
  });
  
  // edit route
  router.get("/:id/edit", (req, res) => {
    
    const id = req.params.id
    Todo.findById(id, (err, todo) => {
        res.render("todos/edit.ejs", {todo})
    })
  });
  
  //update route
  router.put("/:id", (req, res) => {
    const id = req.params.id
    req.body.completed = req.body.completed === "on" ? true : false
    Todo.findByIdAndUpdate(id, req.body, {new: true}, (err, todo) => {
        res.redirect("/todos")
    })
  });
  
  
  // Show Route
  
  router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
  
    // find the particular Todo from the database
    Todo.findById(id, (err, todo) => {
        // render the template with the data from the database
        res.render("todos/show.ejs", {todo})
    })
  })
  

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router