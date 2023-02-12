const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
  local: String,
  city: String,
  state: String,
  address: String,
  hour: String,
  date: Date,
  dateBr: String,
});

module.exports = Person;
