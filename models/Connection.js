const mongoose = require("mongoose");
const { Schema } = mongoose;

const connectionSchema = new Schema({
  id: String,
  sharedListsIds: [Number],
  name: String,
});

module.exports = connectionSchema;
