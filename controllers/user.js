///////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// Signup Routes

router.get("/signup", (req, res) => {
    res.render("user/signup.ejs")
})

router.post("/signup", async (req, res) => {
    // encrypt password
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))
    // create the new user
    User.create(req.body, (err, user) => {
        //redirect to login page
        res.redirect("/user/login")
    })
})


// Login Routes
router.get("/login", (req, res) => {
    res.render("user/login.ejs")
})

router.post("/login", (req, res) => {
    
    const { username, password } = req.body;
    User.findOne({ username }, (err, user) => {
      // checking if userexists
      if (!user) {
        res.send("user doesn't exist");
      } else {
        //check if password matches
        const result = bcrypt.compareSync(password, user.password);
        if (result) {
          req.session.username = username
          req.session.loggedIn = true
          res.redirect("/todos");
        } else {
          res.send("wrong password");
        }
      }
    });
  });

    // logout route
router.get("/logout", (req, res) => {
  // destroy session and redirect to main page
  req.session.destroy((err) => {
      res.redirect("/")
  });
});
//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;