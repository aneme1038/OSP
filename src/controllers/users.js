//----------------
//DEPENDANCIES
//----------------
const express = require('express');
const users = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//get route for users.ejs
users.get('/new', (req, res) => {
  res.render('users/new.ejs');
})
//Post route for user creation
users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  console.log(req.body);
  User.create(req.body, (error, createdUser) => {
    if (error) {
      console.log(error);
    } else {
      console.log(createdUser);
      res.redirect('/');
    }
  });
});

users.get('/', (req, res) => {
  User.find({}, (error, foundUsers) => {
    currentUser = req.body.username
    res.json(foundUsers)
  })
})

users.get('/:id', (req, res) => {
  User.findById(req.params.id, (error, foundUser) => {
    res.json(foundUser)
  })
})

module.exports = users;
