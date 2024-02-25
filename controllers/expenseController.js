const path=require('path')
const Expense=require('../models/expense')
const User=require('../models/user');
function isstringinvalid(string){
    if(string==undefined||string.length==0){
        return true
    }
    else{
        return false
    }
}
exports.expense=(req,res,next)=>{
    console.log('hello')
    res.sendFile(path.join(__dirname,'../','views','expensepage.html'));
}

exports.addExpense=async (req,res,next)=>{
try{
  // console.log(res,'postexpense');
   console.log(req.user);
   const {amount,category,description}=req.body;
   
   if(isstringinvalid(amount)||isstringinvalid(category)||isstringinvalid(description)){

    return res.status(400).json({message:'parameters can never be empty'})

   }
  

   const product=await req.user.createExpense({amount,category,description})
   
    res.status(201).json(product)

}
catch(err){
    console.log(err);
    res.status(500).json({message:'unable to add expensese'})
}

}

exports.getExpense=async (req,res,next)=>{
   try{
    console.log(req.user,'usergetexoanse')
    const expense=await Expense.findAll({where:{userId:req.user.id}});
      res.json(expense);
   }
   catch(err){
    console.log(err)
   }

}

exports.deleteExpense=async (req,res,next)=>{
   try{
    const prodid=req.params.expenseId

    const product=await Expense.findByPk(prodid)

    const deletedproduct=await product.destroy();
    console.log(deletedproduct)

    res.json(deletedproduct)
   }
   catch(err){
    console.log(err)
   }

}