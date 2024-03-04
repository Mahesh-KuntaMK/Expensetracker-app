
const path=require('path')
const Expense=require('../models/expense')
const User=require('../models/user');
const { where } = require('sequelize');

const Razorpay=require('razorpay');
const sequelize = require('../util/database');



exports.leaderboard=async(req,res,next)=>{
try{
   console.log('ekko')

   const userExpense=await User.findAll({
    attributes:['id','username','totalExpense'],
    group:['user.id'],
     order:[['totalExpense','DESC']]
   })
  // const   user=await User.findAll({
  //   attributes:['id','username',[sequelize.fn('sum',sequelize.col('expenses.amount')),'total_cost']],
  //   include:[
  //     {
  //       model:Expense,
  //       attributes:[],

  //     },
     
  //   ],
  //   group:['user.id'],
  //   order:[['total_cost','DESC']]
  // });
  // const   expense= await Expense.findAll({
  //   attributes:['userId',[sequelize.fn('sum',sequelize.col('expense.amount')),'total_cost']],
  //   group:['userId']
  // }
    
  // );

  // console.log(expense)

  // const expenseDetails={

  // }
  // console.log(expense)

  // expense.forEach((expense)=>{
  //   if(expenseDetails[expense.userId]){
  //       expenseDetails[expense.userId]=expenseDetails[expense.userId]+expense.amount
  //   }  else{
  //             expenseDetails[expense.userId]=expense.amount
  //   }
  // })

  // const userDetails=[];

  // user.forEach(user=>{
  //     userDetails.push({name:user.username,total_amount:expenseDetails[user.id]||0})
  // })

  // userDetails.sort((a,b)=>b.total_amount-a.total_amount)

  // console.log(userDetails);
     
  return res.status(200).json(userExpense);
}
catch(err){
  console.log(err)
    return res.status(500).json(err)
}

}