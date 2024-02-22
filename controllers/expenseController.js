const path=require('path')
const Expense=require('../models/expense')
exports.expense=(req,res,next)=>{
    console.log('hello')
    res.sendFile(path.join(__dirname,'../','views','expensepage.html'));
}
exports.addExpense=(req,res,next)=>{
    console.log(req.body)
   const {amount,category,description}=req.body;

   Expense.create({amount,category,description})
   .then(product=>{
         res.json(product)
       
         
   })
   .catch(err=>{
    console.log(err)
   })



}

exports.getExpense=(req,res,next)=>{

}

exports.deleteExpense=(req,res,next)=>{

}