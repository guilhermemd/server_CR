const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
  local: String,
  date: Date,
  dateBr: String,
});

module.exports = Person;
