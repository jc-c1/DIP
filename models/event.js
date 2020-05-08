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



const eventSchema = new Schema({
  eventTitles: String,
  dates: Date,
  eventInfos: String, 
  comments: String,
  guest: [guestSchema]
}, {
  timestamps: true
});

// Ensure that eventTitles are uppercase & not longer than 3 characters
// eventSchema.pre('save', function(next) {
//   this.eventTitles = this.eventTitles.substr(0, 3).toUpperCase();
//   next();
// });














module.exports = mongoose.model('Event', eventSchema);