const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//user schema
const messagesSchema = Schema({
  username: String,
  message: String
})

const Message = mongoose.model('Message', messagesSchema);

module.exports = Message;
