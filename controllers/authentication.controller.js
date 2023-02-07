const userModel = require('./../models/user.model').userModel;
var md5 = require('md5');
module.exports = {
   registration: async (req, res) => {
        try {
            const checkexist = await userModel.find({ username: req.body.username });
            if (checkexist.length > 0) {
                res.send({ error: true, message: 'This Mobile Number already exist!' })
            } else {
                const md5pass = md5(req.body.password)
                const data = await new userModel({
                    "username": req.body.username,
                    "password": md5pass,
                    "firstname": req.body.firstname,
                    "dob": new Date(req.body.dob)
                }).save();
                res.send({data,error:false})
            }
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    },

    login: async (req, res) => {
        try {
            const md5pass = md5(req.body.password)
            const data = await userModel.findOne({
                "username": req.body.username,
                "password": md5pass
            });
            if (data) {
                res.send({ error: false, message: 'Loggin Success',data })
            } else {
                res.send({ error: true, message: 'Invalid User' });
            }
        } catch (err) {
            console.log('err' + err)
            res.send({ error: true, message: 'Internal Error' })
        }
    }
}