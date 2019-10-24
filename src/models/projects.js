const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user schema
const projectsSchema = Schema({
  name: String,
  dateCreated: String,
  category: String,
  subcategory: String,
  description: String
})

const Project = mongoose.model('Project', projectsSchema);

module.exports = Project;
