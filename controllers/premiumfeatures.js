
const path=require('path')
const Expense=require('../models/expense')
const User=require('../models/user');
const { where } = require('sequelize');

const Razorpay=require('razorpay')



exports.leaderboard=async(req,res,next)=>{
try{

  const   user=await User.findAll();
  const   expense= await Expense.findAll();

  console.log('hello')

  const expenseDetails={

  }
  console.log(expense)

  expense.forEach((expense)=>{
    if(expenseDetails[expense.userId]){
        expenseDetails[expense.userId]=expenseDetails[expense.userId]+expense.amount
    }  else{
              expenseDetails[expense.userId]=expense.amount
    }
  })

  const userDetails=[];

  user.forEach(user=>{
      userDetails.push({name:user.username,total_amount:expenseDetails[user.id]||0})
  })

  userDetails.sort((a,b)=>b.total_amount-a.total_amount)

  console.log(userDetails);
     
  return res.status(200).json(userDetails);
}
catch(err){
    return res.status(500).json({error:err})
}

}