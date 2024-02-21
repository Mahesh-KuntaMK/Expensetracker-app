const path=require('path')
const User=require('../models/user')

function isstringinvalid(string){
         if(string==undefined||string.length==0){
            return true
         }
         else{
            return false
         }
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
    await User.create({
              username:username,
              email:email,
              password:password
    })
        //res.sendFile(path.join(__dirname,'../','views','loginpage.html'))
        res.status(201).json({msg:'succussfully created user'})
}

    catch(err){
        console.log(err)
        res.status(403).send(`<div style="color:red;">${err}</div>`)
    }
          
}

exports.userlogin=(req,res,next)=>{
    try{

    
    const email=req.body.email;
    const password=req.body.password;

    console.log(email,password)
    if(isstringinvalid(email)||isstringinvalid(password)){
        return res.status(400).json({err:"paratemers are missing"})
    }
    User.findOne({where:{email:email}})
    .then(data=>{
        if(data.password===password){
            res.status(200).json({login:'succussfully logedin'})
        }
        else{
            res.status(404).json({err:'password doesnt not match'})
        }
    })
    .catch(err=>{
        res.status(404).json({err:'user does not exit'})
    })
}
catch(err){
    res.status(403).join({err:"err in catch nlcok login"})
}
}