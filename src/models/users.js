const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    profdescription: {
    type: String,
    required: true
    },
    botliked: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: () => Date.now()
    }
});

module.exports = mongoose.model("users", usersSchema);
