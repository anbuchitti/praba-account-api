const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    dob: Date,
    firstname: String
})

const userModel = new mongoose.model('user', userSchema);
module.exports.userModel = userModel;