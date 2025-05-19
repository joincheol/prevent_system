const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  title: {type: String, required: true},
  status: {type: String, required: true},
  date: {type: String, required: true},
  count: {type: Number, require: false},
  lat: {type: Number, required: true},
  lng: {type: Number, required: true},
});

module.exports = mongoose.model("location", locationSchema);