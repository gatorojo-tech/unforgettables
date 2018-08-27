const mongoose = require("mongoose");
const connectionSchema = require("./Connection");
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  settings: {
    userId: String,
    userName: String,
    lastAmended: Number,
    preferences: {
      newProductPosition: String
    },
    connections: [connectionSchema]
  },
  productLists: [{
    type: Schema.Types.ObjectId,
    ref: 'lists'
  }]
});

mongoose.model("users", userSchema);
