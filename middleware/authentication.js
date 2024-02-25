const jwt=require('jsonwebtoken');
const User=require('../models/user');

exports.authentication=(req,res,next)=>{

   // console.log(req.headers)
   // console.log(req.headers)
    try{
        const token=req.header('Authorization');
        console.log(token);
        const user=jwt.verify(token, 'secretkey');
        console.log('userID>>>',user.userId);
        User.findByPk(user.userId).then(user=>{
            console.log(user,'post')
            req.user=user
            next();
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:'error in authentication'})
    }
}
exports.authentication1=(req,res,next)=>{

   // console.log(req.headers)
   // console.log(req.headers)
    try{
        const token=req.header('Authorization');
        console.log(token);
        const user=jwt.verify(token, 'secretkey');
        console.log('userID>>>',user.userId);
        User.findByPk(user.userId).then(user=>{
            console.log(user,'post')
            req.user=user
            next();
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({msg:'error in authentication'})
    }
}

