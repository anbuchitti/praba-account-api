var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
const db = require('./config');
var md5 = require('md5');
const userModel = require('./models/user.model').userModel;
const accounttypeModel = require('./models/account-type.model').accounttypeModel;
const incomeModel = require('./models/income.model').incomeModel;
const expenseModel = require('./models/expense.model').expenseModel;

var startOfDay = require('date-fns/startOfDay')
var endOfDay = require('date-fns/endOfDay')

app.use((req, res, next) => {
    next();
});
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Connect Mongo service
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());
db();

app.get("/", (req, res) => res.send('Hi My heart is Working...'));

app.post("/signup", async (req, res) => {
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
});

app.post("/login", async (req, res) => {
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
});

app.post('/accounttype/create', async (req, res) => {
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
})

app.get('/accounttype/list', async (req, res) => {
    try {
        var result = await accounttypeModel.find({});
        res.send(result)
    } catch (err) {
        console.log('err' + err)
        res.send({ error: true, message: 'Internal Error' })
    }
})

app.post('/income/create', async (req, res) => {
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
})

app.get('/income/list', async (req, res) => {
    try {
        var result = await incomeModel.find({ timestamp: { $gte: startOfDay(new Date()), $lt: endOfDay(new Date()) } });
        res.send(result)
    } catch (err) {
        console.log('err' + err)
        res.send({ error: true, message: 'Internal Error' })
    }
})

app.post('/income/filter', async (req, res) => {
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
})

app.post('/expense/create', async (req, res) => {
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
})

app.get('/expense/list', async (req, res) => {
    try {
        var result = await expenseModel.find({ timestamp: { $gte: startOfDay(new Date()), $lt: endOfDay(new Date()) } })
        res.send(result)
    } catch (err) {
        console.log('err' + err)
        res.send({ error: true, message: 'Internal Error' })
    }
})

app.post('/expense/filter', async (req, res) => {
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
})

app.post("/signup", async (req, res) => {
    const result = await new userModel({
        "username": req.body.username, "password": md5(req.body.password)
    }).save();
    res.send(result);
});

app.listen(3000, () => {
    console.log('connected port is 3000');
});