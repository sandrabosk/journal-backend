const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require('./user-model');

const entrySchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  content: {
    type: String,
    required: [true, "Content is required"]
  },
  date: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String
  },
  creator: { 
    type: Schema.Types.ObjectId, ref: "User" 
  }
});

module.exports = mongoose.model('JournalEntry', entrySchema);
