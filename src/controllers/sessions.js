//---------------
//DEPENDANCIES
//---------------
const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

//Close and Destroy User Session
router.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.status(200).json({
      status: 200,
      message: 'Logout Completed'
    });
  });
});

//User Login
router.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (error, foundUser) => {
    if(foundUser === null) {
      res.status(404).json({
        status: 404,
        message: 'User Not Found',
        userData: foundUser
      })
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)){
        req.sessions.currentUser = foundUser;
        res.status(201).json({
          status:201,
          message: 'User Session Created',
          userData: foundUser
        });
      } else {
        res.status(401).json({
          status: 401,
          message: 'Login Failed'
        });
      }
    }
  });
});

//export router
module.exports = router;
