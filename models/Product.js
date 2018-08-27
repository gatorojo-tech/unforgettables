const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  id: String,
  name: String,
  comment: String,
  bought: {
    type: Boolean,
    default: false
  },
});

module.exports = productSchema;
