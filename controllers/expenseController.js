const path=require('path')
const Expense=require('../models/expense')
const User=require('../models/user');
const { where } = require('sequelize');

const Razorpay=require('razorpay')

function isstringinvalid(string){
    if(string==undefined||string.length==0){
        return true
    }
    else{
        return false
    }
}

exports.expense=(req,res,next)=>{
   // console.log('hello')
    res.sendFile(path.join(__dirname,'../','views','expensepage.html'));
}



exports.addExpense=async (req,res,next)=>{
try{
  // console.log(res,'postexpense');
   //console.log(req.user);
   const {amount,category,description}=req.body;
   
   if(isstringinvalid(amount)||isstringinvalid(category)||isstringinvalid(description)){

    return res.status(400).json({message:'parameters can never be empty'})

   }

   let total_amount
if(req.user.totalExpense){
     total_amount=parseInt(req.user.totalExpense);
}
else{
    total_amount=0;
}
  
  

   const product=await req.user.createExpense({amount,category,description})


   req.user.update({'totalExpense':(total_amount+parseInt(product.amount))})

   
    res.status(201).json(product)

}
catch(err){
   // console.log(err);
    res.status(500).json({message:'unable to add expensese'})
}

}

exports.getExpense=async (req,res,next)=>{
   try{
    //console.log(req.user,'usergetexoanse')
    const expense=await Expense.findAll({where:{userId:req.user.id}});
      res.json({expense,premium:req.user.isPremiumUser});
   }
   catch(err){
    console.log(err)
   }

}

exports.deleteExpense=async (req,res,next)=>{
   try{
    const prodid=req.params.expenseId

    const product=await Expense.findOne({where:{id:prodid,userId:req.user.id}})

    const deletedproduct=await product.destroy();

    //console.log(deletedproduct)

    res.json(deletedproduct)
   }
   catch(err){
    console.log(err)
   }

}
