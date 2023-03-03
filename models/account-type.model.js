const mongoose = require('mongoose');

const accountTypeSchema = new mongoose.Schema({
    uniqueid:String,
    typename:String
});

const accountTypeModel = mongoose.model('account-type',accountTypeSchema);
module.exports.accountTypeModel = accountTypeModel;