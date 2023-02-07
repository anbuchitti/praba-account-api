const incomeModel = require('./../models/income.model').incomeModel;
var startOfDay = require('date-fns/startOfDay');
var endOfDay = require('date-fns/endOfDay');

module.exports = {
    createIncome:  async (req, res) => {
        try {
            var result = await new incomeModel({
                timestamp: new Date(),
                typename: req.body.typename,
                amount: req.body.amount
            }).save()
            res.send(result);
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    incomeList:  async (req, res) => {
        try {
            var result = await incomeModel.find({ timestamp: { $gte: startOfDay(new Date()), $lt: endOfDay(new Date()) } });
            res.send(result)
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    incomeFilter: async (req, res) => {
        try {
            var result = await incomeModel.find({
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