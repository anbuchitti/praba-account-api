const mongoose = require('mongoose');
const incomeSchema = mongoose.Schema({
    timestamp: Date,
    typename: String,
    amount: Number
})

const incomeModel = new mongoose.model('income',incomeSchema);
module.exports.incomeModel = incomeModel;