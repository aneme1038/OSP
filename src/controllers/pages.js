const express = require('express');
const pages = express.Router();
const Project = require('../models/projects.js');
const Message = require('../models/messages.js');
const User = require('../models/users.js');

//get Routes
pages.get('/how-it-works', (req, res) => {
  res.render('./navigation/howItWorks.ejs')
})
pages.get('/discover', (req, res) => {
  res.render('./navigation/discover.ejs')
})
pages.get('/about', (req, res) => {
  res.render('./navigation/about.ejs')
})

module.exports = pages;
