const path=require('path')

exports.signup=(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','signup.html'))
}