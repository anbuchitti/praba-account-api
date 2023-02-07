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
app.put('/accounttype/update/:id', accounttypeController.updateAccoutType);
app.get('/accounttype/list',accounttypeController.listAccountType);
app.get('/accounttype/byid/:id',accounttypeController.fetchAccountTypeById);
app.delete('/accounttype/delete/:id',accounttypeController.deleteAccountTypeById);

app.post('/income/create',incomeController.createIncome);
app.put('/income/update/:id',incomeController.updateIncome);
app.get('/income/list',incomeController.listIncome);
app.get('/income/byid/:id',incomeController.fetchIncomeById);
app.post('/income/filter',incomeController.filterIncome);
app.delete('/income/delete/:id',incomeController.deleteIncomeById);


app.post('/expense/create',expenseController.createExpense);
app.put('/expense/update/:id',expenseController.updateExpense);
app.get('/expense/list',expenseController.listExpense);
app.get('/expense/byid/:id',expenseController.fetchExpenseById);
app.post('/expense/filter',expenseController.filterExpense);
app.delete('/expense/delete/:id',expenseController.deleteExpenseById);

app.listen(3000, () => {
    console.log('connected port is 3000');
});