const mongoose = require("./connection");
const Todo = require("./todo")

///////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

// Make sure code is not run till connected
mongoose.connection.on("open", () => {

    const startTodos = [
        { name: "Do project 2", category: "School", comment:"create an app then deployed to Heroku", date_to_do:"10/12/2021", due_date:"10/16/2021", completed: false },
        { name: "Get groceries", category: "House", comment:"Go to Whole Food to get groceries for the week", date_to_do:"10/12/2021", due_date:"", completed: true },
        { name: "Look for hotel", category: "Vaction", comment:"Look for a place to stay for trip to Aruba 2022", date_to_do:"10/20/2021", due_date:"12/16/2021", completed: false },
        { name: "Get tickets concert", category: "Entertaiment", comment:"Get ticket for 50 cents concert", date_to_do:"10/12/2021", due_date:"10/20/2021", completed: true },
      ]
  Todo.deleteMany({}, (err, data) => {
    Todo.create(startTodos,(err, data) => {
        console.log(data)
        
        mongoose.connection.close();
      }
    );
  });

});