
const accountTypeModel = require('./../models/account-type.model').accountTypeModel;
const crudBusiness = require('./../business/crud.business');

module.exports = {
    createAccountType: async (req, res) => {
        try {
            const result = await crudBusiness.createData(accountTypeModel,req.body);
            res.send(result);
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    updateAccoutType:async(req,res) => {
        try {
            var result = await crudBusiness.updateData(accountTypeModel,req.body,req.params.id);
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    },
    listAccountType: async (req, res) => {
        try {
            const result = await crudBusiness.Listdata(accountTypeModel,true);
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    },
    fetchAccountTypeById: async(req,res) => {
        try {
            var result = await crudBusiness.getByIdData(accountTypeModel,req.params.id);
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    },
    deleteAccountTypeById: async (req, res) => {
        try {
            var result = await crudBusiness.deleteData(accountTypeModel,req.params.id);
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    }    
}
