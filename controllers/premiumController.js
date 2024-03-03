const path=require('path')

const Expense=require('../models/expense')

const User=require('../models/user');

const { where } = require('sequelize');

const Razorpay=require('razorpay');

const Order=require('../models/order');
const { response } = require('express');

exports.gopremium=(req,res,next)=>{
   
    
    try{
        const rzp=new Razorpay({
            key_id:process.env.razor_key_id,
            key_secret:process.env.razor_key_secret
        })
 

    
       rzp.orders.create({'amount':10000,'currency':"INR"},(err,order)=>{
          if(!err){
              console.log(order)
             req.user.createOrder({orderid:order.id,status:'pending'}).then(()=>{
                  res.status(201).json({order,key_id:rzp.key_id});
             })
          }
          else{
            res.json(err)
          }
       })
    
    }
    catch(err){
        res.status(500).json({message:'there is a error in getpremiujms',err:err})
    }

    
}

exports.updatepremium=async (req,res,next)=>{
  try{
     const {order_id,payment_id}=req.body;
     
     const order=await Order.findOne({where:{orderid:order_id}})
     if(payment_id){
         
      const promise1 =await order.update({paymentid:payment_id,status:"SUCCESS"})
      const promise2= await req.user.update({isPremiumUser:true})
      Promise.all([promise1,promise2]).then(()=>{
        return res.status(200).json({msg:'payment succes ur an  premium user'})
     })
     .catch(err=>{
         
         throw Error(err)
     })
     }
     else{
          
      const promise1 =await order.update({status:"Failed"})
      const promise2= await req.user.update({isPremiumUser:false})

      Promise.all([promise1,promise2]).then(()=>{
        return res.status(200).json({msg:'payment failed ur not premium user'})
     })
     .catch(err=>{
         
         throw Error(err)
     })

     }
   
    }
   catch(err) {
         res.status(500).json({msg:err})
    }              
               
       
             

}