const path=require('path')
const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Razorpay=require('razorpay') 

function isstringinvalid(string){
         if(string==undefined||string.length==0){
            return true
         }
         else{
            return false
         }
}
function generateAccesstoken(id,email){
    return jwt.sign({userId:id,email:email},'secretkey');
}

exports.signup=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','signup.html'))
}
exports.login=(req,res,next)=>{
     res.sendFile(path.join(__dirname,'../','views','loginpage.html'))
}
exports.usersignup=async (req,res,next)=>{
try{ 
   const username=req.body.username
   const email=req.body.email
   const password=req.body.password
   console.log(username,email,password)
   if(isstringinvalid(username)||isstringinvalid(email)||isstringinvalid(password)){

     return res.status(400).json({err:"paratemers are missing"})
   }

   const saltrounds=10
   bcrypt.hash(password,saltrounds,async (err,hash)=>{
      console.log(err)
      await User.create({
        username:username,
        email:email,
        password:hash
})
  //res.sendFile(path.join(__dirname,'../','views','loginpage.html'))
 
   })
   res.status(201).json({msg:'succussfully created user'})
   
}

    catch(err){
        console.log(err)
        res.status(500).send(`<div style="color:red;">${err}</div>`)
    }
          
}

exports.userlogin=async (req,res,next)=>{
    try{   
    const email=req.body.email;
    const password=req.body.password;
    console.log(email,password)

    if(isstringinvalid(email)||isstringinvalid(password)){
        return res.status(400).json({err:"paratemers are missing"})
    }

   const user =await User.findOne({where:{email:email}})


        bcrypt.compare(password,user.password,(err,result)=>{
            if(!err){
                res.status(201).json({message:'succussfully loggedin',token:generateAccesstoken(user.id,user.email)})
            }
            else{
                res.status(401).json({message:'password doesnt not match'})
            }
        })
}
catch(err){
    res.status(500).json({err:"err in catch blcok login"})
}
}


exports.getpremium=(req,res,next)=>{

    
}