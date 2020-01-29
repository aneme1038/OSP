//---------------
//DEPENDANCIES
//---------------
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//get route for sessions
sessions.get('/login', (req, res) => {
  res.render('sessions/new.ejs');
})

sessions.post("/", (req, res) => {
  User.findOne({username: req.body.username}, (error, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      console.log("I have successfully signed in.");
      req.session.currentUser = foundUser;
      res.redirect("/");
    } else {
      res.send('<a href="/">Something has gone horribly wrong.</a>')
    };
  });
});

//Close and Destroy User Session
//**Seek Alternative means of destroying session as route is not currently working as is (check EJS File)
sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
    console.log('I have successfully signed out');
  });
});
//export sessions
module.exports = sessions;
