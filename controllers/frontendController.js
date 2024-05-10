const path=require('path')
const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const Razorpay=require('razorpay') 
const uuid = require('uuid');

require('dotenv').config();

const Sib=require('sib-api-v3-sdk');

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
   //console.log(username,email,password)
   if(isstringinvalid(username)||isstringinvalid(email)||isstringinvalid(password)){

     return res.status(400).json({err:"paratemers are missing"})
   }

   const saltrounds=10
   bcrypt.hash(password,saltrounds,async (err,hash)=>{
 if(err){
    throw new Error(err);
 }
      User.create({
        username:username,
        email:email,
        password:hash
}).then(()=>{
    res.status(201).json({msg:'succussfully created user'})
})
.catch((err)=>{
    res.status(500).json({err:err,msg:'email is already registered'})
})
  //res.sendFile(path.join(__dirname,'../','views','loginpage.html'))
  
   })
   
   
}

    catch(err){
        //console.log('err')
          //console.log(err)
        res.status(500).json({err:err,msg:'email is already registered'})
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

   console.log(password,'password entered in login page')

   console.log(user.password,'password entered array')

  
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                console.log('login','pasword  match')
                return res.status(201).json({message:'succussfully loggedin',token:generateAccesstoken(user.id,user.email)})
            }
            else{
                res.status(401).json({message:'password doesnt not match'})
            }
        })
}
catch(err){
    return res.status(500).json({err:err})
}
}


exports.forgotPassword=(req,res,next)=>{
       
          
    res.sendFile(path.join(__dirname,'../','views','forgotpassword.html'))


    
}

exports.resetPassword=(req,res,next)=>{

    console.log(req.body.email);
    //res.status(200).json("password reset link sent to registed mail id")


    const {email}=req.body;

    User.findOne({where:{email:email}})
    .then((user)=>{
       const  id=uuid.v4();
       
        return user.createForgotpassword({id,isActive:'true'})
    })
    .then((reqkey)=>{

        const client=Sib.ApiClient.instance
        const apiKey=client.authentications['api-key'];
        apiKey.apiKey=process.env.Sib_Api_Key
        const transEmailApi=new Sib.TransactionalEmailsApi();
    
        const sender={
            email:'k.maheshkunta@gmail.com',
    
        }
    
        const receivers=[{
            email:email
        
        }]
    
    transEmailApi.sendTransacEmail({
        sender,
        to:receivers,
        subject:' password reset link since you have forgotten current password',
        textContent:`<a href='http://localhost:3000/password/resetpassword/{{params.id}}'>click here to reset your password</a>
        http://localhost:3000/password/resetpassword/{{params.id}}`,
        params:{
            id:reqkey.id
        }
    })
    
    .then(()=>{
        return res.status(200).json({msg:'password reset link sent to user'})
    })
    .catch(console.log)

    })
    .catch((err)=>{
        console.log(err)
    })

   

}