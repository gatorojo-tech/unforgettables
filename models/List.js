const mongoose = require("mongoose");
const productSchema = require("./Product");
const { Schema } = mongoose;

const listSchema = new Schema({
  id: String,
  title: String,
  sharedWith: [String],
  creationDate: Number,
  lastAmendmentsDate: Number,
  products: [productSchema],
  updatedConnections: {},
});

mongoose.model("lists", listSchema);

module.exports = listSchema;
