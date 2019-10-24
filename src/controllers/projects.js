const express = require('express');
const projects = express.Router();
const Project = require('../models/projects.js');

//get Route
projects.get('/', (req, res) => {
  Project.find({}, (error, projects) => {
    res.render('./navigation/howItWorks.ejs');
  })
})
//post route
projects.post('/', (req, res) => {
  var project = new Project(req.body);
  project.save((error) => {
    if(error){
      sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  })
})
//individual project get route
projects.get('/:id', (req, res) => {
  Project.findById(req.params.id, (error, foundProject) => {
    res.json(foundProject)
  })
})

projects.delete('/:id', (req, res) => {
  Project.findByIdAndDelete(req.params.id, (error, foundProject) => {
    res.redirect('/');
  })
})

module.exports = projects;
