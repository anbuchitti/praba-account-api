const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/praba_account');

    mongoose.connection.on('connected', () => {
        console.log(`Mongoose default connection is open`);
    });

    mongoose.connection.on('error', (err) => {
        console.log(`Mongoose default connection has occured ${err}`)
    });

    mongoose.connection.on('disconnected',()=> {
        console.log(`Mongoose default connection is disconnected`)
    })

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
    });
}