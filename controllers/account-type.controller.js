
const  accounttypeModel = require('./../models/account-type.model');
const crudBusiness = require('./../business/crud.business');

module.exports = {
    createAccountType: async (req, res) => {
        try {
            const result = await crudBusiness.createData(accounttypeModel,req.body);
            res.send(result);
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    updateAccoutType:async(req,res) => {
        try {
            var result = await crudBusiness.updateData(accounttypeModel,req.body,req.params.id);
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    },
    listAccountType: async (req, res) => {
        try {
            const result = await crudBusiness.Listdata(accounttypeModel,true);
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    },
    fetchAccountTypeById: async(req,res) => {
        try {
            var result = await crudBusiness.getByIdData(accounttypeModel,req.params.id);
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    },
    deleteAccountTypeById: async (req, res) => {
        try {
            var result = await crudBusiness.deleteData(accounttypeModel,req.params.id);
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    }
    
}