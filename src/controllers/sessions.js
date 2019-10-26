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
//Close and Destroy User Session
sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({
      status: 200,
      message: 'Logout Completed'
    });
  });
});

//User Login
sessions.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (error, foundUser) => {
    console.log(req.body);
    //series of checks for username and password
    if (error) {
      console.log(error);
      res.send('The Database encountered some error.')
    } else if (!foundUser) {
      //if the user found is considered "undefined" or "null"
      res.send('<a href="/">Sorry, no such user was found</a>')
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)){
        console.log(foundUser);
        req.session.currentUser = foundUser;
        res.redirect('/');
      } else {
        res.status(401).json({
          status: 401,
          message: 'Login Failed'
        });
      }
    }
  });
});

//export sessions
module.exports = sessions;
