const mongoose = require('mongoose');
const expenseSchema = mongoose.Schema({
    timestamp: Date,
    typename: String,
    remarks: String,
    amount: Number,

})

const expenseModel = new mongoose.model('expense',expenseSchema);
module.exports.expenseModel = expenseModel;