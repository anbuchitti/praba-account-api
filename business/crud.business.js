const startOfDay = require('date-fns/startOfDay');
const endOfDay = require('date-fns/endOfDay');

module.exports = {
    createData: async (model, reqData) => {
        try {
            const checkexist = reqData.uniqueid ? await model.find({ uniqueid: reqData.uniqueid }) : [];
            if (checkexist.length > 0) {
                return ({ error: true, message: 'This type name already exist' })
            } else {
                return await new model(reqData).save();
            }
        } catch (err) {
            console.log('err' + err)
            return({ error: true, message: 'Internal Error' })
        }
    },
    updateData: async (model, reqData, _id) => {
        try {
            return await model.update({ _id },{$set: reqData});
        } catch (err) {
            console.log('err' + err);
            return ({ error: true, message: 'Internal Error' });
        }
    },
    getByIdData: async (model, _id) => {
        try {
            return await model.findById({ _id });
        } catch (err) {
            console.log('err' + err)
            return ({ error: true, message: 'Internal Error' })
        }
    },
    Listdata: async (model,isAccount) => {
        try {
            if(isAccount)
                return await accounttypeModel.find({});
            else
                return await model.find({ timestamp: { $gte: startOfDay(new Date()), $lt: endOfDay(new Date()) } })
        } catch (err) {
            console.log('err' + err)
            return ({ error: true, message: 'Internal Error' })
        }
    },
    FilterData: async (model, reqData) => {
        try {
            return await model.find({
                timestamp: {
                    $gte: startOfDay(new Date(reqData.startdate)),
                    $lt: endOfDay(new Date(reqData.enddate))
                }
            })
        } catch (err) {
            console.log('err' + err)
            return ({ error: true, message: 'Internal Error' })
        }
    },
    deleteData: async (model,_id) => {
        try {
            return await model.remove({ _id })
        } catch (err) {
            console.log('err' + err)
            return ({ error: true, message: 'Internal Error' })
        }
    }
}