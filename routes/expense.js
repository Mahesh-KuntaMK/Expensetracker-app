const express=require('express');
const routes=express.Router();
const expanseController=require('../controllers/expenseController');
const authController=require('../middleware/authentication');



routes.get('/',expanseController.expense);
routes.post('/addexpense',authController.authentication1,expanseController.addExpense);
routes.get('/getexpense',authController.authentication,expanseController.getExpense);
routes.delete('/delete-expense/:expenseId',expanseController.deleteExpense)

module.exports=routes;