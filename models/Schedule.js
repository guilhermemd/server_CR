const mongoose = require("mongoose");

const Schedule = mongoose.model("schedule", {
  local: String,
  mapsInfo: String,
  city: String,
  state: String,
  address: String,
  hour: String,
  date: Date,
  dateBr: String,
});

module.exports = Schedule;
