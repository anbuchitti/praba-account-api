var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
const db = require('./config');
const accounttypeController = require('./controllers/account-type.controller');
const userController = require('./controllers/authentication.controller');
const expenseController = require('./controllers/expense.controller');
const incomeController = require('./controllers/income.controller');

app.use((req, res, next) => {
    next();
});
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Connect Mongo service
app.use((req, res, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.header('Access-Control-Allow-Credentials', true);
    next();
});
app.use(bodyParser.json());
db();

app.get("/", (req, res) => res.send('Hi My heart is Working...'));
app.post("/signup", userController.registration);
app.post("/login", userController.login);

app.post('/accounttype/create', accounttypeController.createAccountType);
app.get('/accounttype/list',accounttypeController.accountTypeList);
app.delete('/accounttype/delete/:id',accounttypeController.deleteAccountType);

app.post('/income/create',incomeController.createIncome);
app.get('/income/list',incomeController.incomeList);
app.post('/income/filter',incomeController.incomeFilter);

app.post('/expense/create',expenseController.createExpense);
app.get('/expense/list',expenseController.expenseList);
app.delete('/expense/delete/:id',expenseController.deleteExpense);
app.post('/expense/filter',expenseController.expenseFilter);

app.listen(3000, () => {
    console.log('connected port is 3000');
});