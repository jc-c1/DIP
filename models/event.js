const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const guestSchema = new Schema(
  {
    email: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const eventSchema = new Schema(
  {
    eventTitles: String,
    dates: Date,
    eventInfos: String,
    comments: String,
    host: [String],
    guest: [guestSchema],
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Event", eventSchema);
