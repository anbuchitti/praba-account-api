
const  accounttypeModel = require('./../models/account-type.model');

module.exports = {
    createAccountType: async (req, res) => {
        try {
            const checkexist = await accounttypeModel.find({ uniqueid: req.body.uniqueid });
            if (checkexist.length > 0) {
                res.send({ error: true, message: 'This type name already exist' })
            } else {
                var result = await new accounttypeModel({
                    uniqueid: req.body.uniqueid,
                    typename: req.body.typename
                }).save()
                res.send(result)
            }
    
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },
    accountTypeList: async (req, res) => {
        try {
            var result = await accounttypeModel.find({});
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    },
    deleteAccountType: async (req, res) => {
        try {
            var result = await accounttypeModel.remove({ _id: req.params.id });
            res.send(result);
        } catch (err) {
            console.log('err' + err);
            res.send({ error: true, message: 'Internal Error' });
        }
    }
}