
const path=require('path')
const Expense=require('../models/expense')
const User=require('../models/user');
const { where, Sequelize } = require('sequelize');

const Razorpay=require('razorpay');
const sequelize = require('../util/database');

const AWS=require('aws-sdk');





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

function uploadtoS3(data,filename){

    const BUCKET_Name='expensetracker1313';
    const IAM_KEY='AKIAXYKJQS6W45LZNHDJ';
    const IAM_SECRET='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';

    const s3bucket= new AWS.S3({
      accessKeyId:IAM_KEY,
      secretAccessKey:IAM_SECRET
    })
    // s3bucket.createBucket(()=>{
    //   var params={
    //     Bucket:BUCKET_Name,
    //     Key:filename,
    //     Body:data,
    //     ACL:'public-read'
    //   }
    // })

       var params={
        Bucket:BUCKET_Name,
        Key:filename,
        Body:data,
        ACL:'public-read'
      }

return new  Promise((resolve,reject)=>{

  s3bucket.upload(params,(err,s3response)=>{
    if(err){
      reject(err);
    }else{
      resolve(s3response.Location);
    }
  })

})
    // s3bucket.upload(params,(err,s3response)=>{
    //   if(err){
    //     console.log('smg went wrong',err)
    //   }else{
    //     console.log('success',s3response);
    //   }
    // })

}
exports.expensereport=async (req,res,next)=>{

//needs to write a query and send to frontend through api

const expensereport=await req.user.getExpenses();

const stringyfiedexpense=JSON.stringify(expensereport);

const userId=req.user.id;

const filename=`expense${userId}/${new Date()}.txt`;

const fileURL= await uploadtoS3(stringyfiedexpense,filename);

res.status(200).json({fileURL,expensereport});




// req.user.getExpenses()
// .then((data)=>{
//   res.status(200).json(data)
// })
// .catch(err=>{
//   res.status(401).json(err)
// })







}