//-----------------
//DEPENDANCIES
//-----------------
//express
const express = require('express');
//mongoose
const mongoose = require('mongoose');
const app = express();
//Sessions
const sessions = require('express-session');
//mongoose connection variable
const db = mongoose.connection;
//CORS
const cors = require('cors');
//HTTP
const http = require('http').Server(app);
//Socket.io
const io = require('socket.io')(http);
//method override
const methodOverride = require('method-override');
//dotenv
require('dotenv').config();
const PORT = process.env.PORT || 3000;
console.log(PORT);
//Mongoosesdfconnection;
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

//-------------------
//MIDDLEWARE
//-------------------
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./views'));
app.use(sessions({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(cors());

//---------------------
//CONTROLLERS
//---------------------
const userController = require('./src/controllers/users.js');
app.use('/users', userController);
const sessionsController = require('./src/controllers/sessions.js');
app.use('/session', sessionsController);
//Add additional controllers below...
const messagesController = require('./src/controllers/messages.js');
app.use('/messages', messagesController);
const projectsController = require('./src/controllers/projects.js');
app.use('/projects', projectsController);
const pagesController = require('./src/controllers/pages.js');
app.use('/directory', pagesController);
//main index route
app.get('/', (req, res) => {
  res.render('index.ejs', {
    currentUser: req.session.currentUser
  });
});
//Main Server Route for user login session
app.get('/app', (req, res) => {
  if(req.session.currentUser){
    res.render('app/index.ejs');
  } else {
    res.redirect('/sessions/new.ejs');
  };
});
//--------------------
//DATABASE CONNECTION
//--------------------
//Connect to MongoDB Cloud Atlas
//add mongodb uri once we have it
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
//Error / Success - Development Side
db.on('error', (error) => {
  console.log(error.message + ' is MongoD not running?');
});
db.on('connected', () => {
  console.log('Mongo Connected: ', /* insert Mongodb uri variable here */);
});
db.on('disconnected', () => {
  console.log('Mongo Disconnected');
});
//Connect to MongoDB locally
mongoose.connection.once('open', () => {
  console.log('Connected to Mongoose');
});

//--------------------
//HANDLERS
//--------------------
  //handler to update modal styling
// const updateModal = (modal) => {
//   if(modal.style.display === "none") {
//     modal.style.display = "block";
//   } else {
//     modal.style.display = "none";
//   }
// }
//--------------------
//LISTENERS
//--------------------
app.listen(PORT, () => {
  console.log('Listening on ', PORT);
});
// //Wait for DOM Load...
// document.addEventListener("DOMContentLoaded", function(){
//   //Modals
//   const loginModal = document.getElementById('loginModal');
//   const registerModal = document.getElementById('registerModal');
//   document.getElementById('loginClick').addEventListener("click", updateModal(loginModal));
//   document.getElementById('registerClick').addEventListener("click", updateModal(registerModal));
// }, false);
