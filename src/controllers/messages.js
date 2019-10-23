const express = require ('express');
const messages = express.Router();
const Message = require('../models/messages.js');

//get route
messages.get('/', (req, res) => {
  Message.find({}, (error, messages) => {
    res.send(messages);
  })
})
//post route
messages.post('/', (req, res) => {
  var message = new Message(req.body);
  message.save((error) => {
    if(error){
      sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  })
})
messages.get('/:id', (req, res) => {
  Message.findById(req.params.id, (error, foundMessage) => {
    res.json(foundMessage)
  })
})
messages.delete('/:id', (req, res) => {
  Message.findByIdAndDelete(req.params.id, (error, foundMessage) => {
    res.redirect('/');
  })
})
module.exports = messages;
