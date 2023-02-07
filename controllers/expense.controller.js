const expenseModel = require('./../models/expense.model').expenseModel;
const crudBusiness = require('./../business/crud.business');

module.exports = {
    createExpense: async (req, res) => {
        try {
            const result = await crudBusiness.createData(expenseModel,{timestamp: new Date(),...req.body});
            res.send(result)
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    listExpense: async (req, res) => {
        try {
            const result = await crudBusiness.Listdata(expenseModel,false);
            res.send(result)
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    filterExpense: async (req, res) => {
        try {
            var result = await crudBusiness.FilterData(expenseModel,req.body);
            res.send(result)
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    fetchExpenseById: async (req, res) => {
        try {
            var result = await crudBusiness.getByIdData(expenseModel,req.params.id);
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    },
    updateExpense: async (req, res) => {
        try {
            var result = await crudBusiness.updateData(expenseModel,req.body,req.params.id);
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    },
    deleteExpenseById: async (req, res) => {
        try {
            var result = await crudBusiness.deleteData(expenseModel,req.params.id);
            res.send(result)
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
}