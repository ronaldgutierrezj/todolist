
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.ejs");
  });

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////

module.exports = router