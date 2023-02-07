const incomeModel = require('./../models/income.model').incomeModel;
const crudBusiness = require('./../business/crud.business');

module.exports = {
    createIncome: async (req, res) => {
        try {
            const result = await crudBusiness.createData(incomeModel, { timestamp: new Date(), ...req.body });
            res.send(result);
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    updateIncome: async (req, res) => {
        try {
            const result = await crudBusiness.updateData(incomeModel,req.body,req.params.id);
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    },
    listIncome: async (req, res) => {
        try {
            const result = await crudBusiness.Listdata(incomeModel,false);
            res.send(result)
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    filterIncome: async (req, res) => {
        try {
            const result = await crudBusiness.FilterData(incomeModel,req.body);
            res.send(result)
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    fetchIncomeById: async (req, res) => {
        try {
            const result = await crudBusiness.getByIdData(incomeModel,req.params.id);
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    },
    deleteIncomeById: async (req, res) => {
        try {
            const result = await crudBusiness.deleteData(incomeModel,req.params.id);
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    },
}