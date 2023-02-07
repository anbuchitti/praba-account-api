const expenseModel = require('./../models/expense.model').expenseModel;
var startOfDay = require('date-fns/startOfDay');
var endOfDay = require('date-fns/endOfDay');

module.exports = {
    createExpense: async (req, res) => {
        try {
            var result = await new expenseModel({
                timestamp: new Date,
                typename: req.body.typename,
                amount: req.body.amount,
                remarks: req.body.remarks
            }).save();
            res.send(result)
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    expenseList: async (req, res) => {
        try {
            var result = await expenseModel.find({ timestamp: { $gte: startOfDay(new Date()), $lt: endOfDay(new Date()) } })
            res.send(result)
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    deleteExpense: async (req, res) => {
        try {
            var result = await expenseModel.remove({ _id: req.params.id })
            res.send(result)
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    expenseFilter: async (req, res) => {
        try {
            var result = await expenseModel.find({
                timestamp: {
                    $gte: startOfDay(new Date(req.body.startdate)),
                    $lt: endOfDay(new Date(req.body.enddate))
                }
            })
            res.send(result)
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    }
}