const express = require ('express');
const messages = express.Router();
const Message = require('../models/messages.js');

//get route
messages.get('/messages', (req, res) => {
  Message.find({}, (error, messages) => {
    res.send(messages);
  })
})
//post route
messages.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((error) => {
    if(error){
      sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  })
})
