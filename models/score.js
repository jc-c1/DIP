const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const guestSchema = new Schema(
  {
    email: String,
    status: String,
  },
  {
    timestamps: true
  }
);



const scoreSchema = new Schema({
  initials: String,
  numGuesses: Number,
  seconds: Number, 
  guest: [guestSchema]
}, {
  timestamps: true
});

// Ensure that initials are uppercase & not longer than 3 characters
scoreSchema.pre('save', function(next) {
  this.initials = this.initials.substr(0, 3).toUpperCase();
  next();
});














module.exports = mongoose.model('Score', scoreSchema);