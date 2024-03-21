const path=require('path')
const Expense=require('../models/expense')
const User=require('../models/user');
const { where } = require('sequelize');
const sequelize=require('../util/database');


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
    const t = await sequelize.transaction();
try{
  // console.log(res,'postexpense');
   //console.log(req.user);
 //  const t = await sequelize.transaction();
   const {amount,category,description}=req.body;
   
   const date=new Date();
   if(isstringinvalid(amount)||isstringinvalid(category)||isstringinvalid(description)){

    return res.status(400).json({message:'parameters can never be empty'})

   }


  
  

   const product=await req.user.createExpense({amount,category,description,date},{ transaction: t })

   const total_amount=Number(req.user.totalExpense)+Number(product.amount)


  await  req.user.update({'totalExpense':total_amount},{ transaction: t });
  
   await t.commit();
   
    res.status(201).json(product)

}
catch(err){
   // console.log(err);
  await t.rollback();

    res.status(500).json(err)
}

}

exports.getExpense=async (req,res,next)=>{
   try{
    //console.log(req.user,'usergetexoanse')
   const page=+req.query.page||1;

   console.log(page);

   const noofrows=req.query.noofrows;

   console.log(req.query);


const ITEMS_PER_PAGE=Number(noofrows);
const totalitems=await  Expense.count({where:{userId:req.user.id}});

const expense=await Expense.findAll({
    where:{userId:req.user.id},
    offset:(page-1)*ITEMS_PER_PAGE,
    limit:ITEMS_PER_PAGE
});

console.log(totalitems);
console.log(totalitems/ITEMS_PER_PAGE)
const pagedata={
   
        currentPage:page,
        prevPage:page-1,
        hasnextPage: ITEMS_PER_PAGE*page<totalitems,
        nextPage:page+1,
        hasPrevPage:page>1,
        lastPage:Math.ceil(totalitems/ITEMS_PER_PAGE)
      
}


  res.json({expense,premium:req.user.isPremiumUser,pagedata});
}
catch(err){
console.log(err)
}

}

exports.deleteExpense=async (req,res,next)=>{
const t=await sequelize.transaction();
   try{
    const prodid=req.params.expenseId

    const product=await Expense.findOne({where:{id:prodid,userId:req.user.id},transaction:t})

    const amounttodeducted=product.amount;
    const totalExpense=Number(req.user.totalExpense)-Number(amounttodeducted);

  

    const deletedproduct=await product.destroy({transaction:t});

    await req.user.update({'totalExpense':totalExpense},{transaction:t})

    //console.log(deletedproduct)
    await t.commit();

    res.json(deletedproduct)
   }
   catch(err){
    await t.rollback();
    console.log(err)
    res.status(500).json({err:err,msg:'deleted failed '})
   }

}
