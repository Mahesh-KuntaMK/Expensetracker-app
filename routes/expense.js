const express=require('express');
const routes=express.Router();
const expenseController=require('../controllers/expenseController');
const authController=require('../middleware/authentication');




routes.get('/',expenseController.expense);

routes.get('/getexpense',authController.authentication,expenseController.getExpense);

routes.post('/addexpense',authController.authentication,expenseController.addExpense);



routes.delete('/delete-expense/:expenseId',authController.authentication,expenseController.deleteExpense);

module.exports=routes;          