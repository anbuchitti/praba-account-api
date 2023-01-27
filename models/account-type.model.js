const mongoose = require('mongoose');

const accounttypeSchema = new mongoose.Schema({
    uniqueid:String,
    typename:String
});

const accounttypeModel = mongoose.model('account-type',accounttypeSchema);
module.exports.accounttypeModel = accounttypeModel;