const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true
  },
  botliked: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: false,
    default: "This user has no bio"
  },
  time: {
    type: Date,
    default: () => Date.now()
  },
  certdev: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("users", usersSchema);
