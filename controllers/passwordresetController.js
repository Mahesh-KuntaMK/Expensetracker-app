const Forgotpassword = require('../models/forgotpassword');
const forgotPassword=require('../models/forgotpassword');

const User=require('../models/user');
const bcrypt=require('bcrypt');
const path=require('path')




    exports.resetPassword=(req,res,next)=>{
        
    
    const forgetuserid=req.params.id;


    console.log(forgetuserid);

    forgotPassword.findOne({where:{id:forgetuserid,isActive:true}})
    .then((data)=>{
    return res.send(`<html>
    <body>
    <div class="signup-container">
        <h2>Reset Password</h2>
        <form method="post" action="http://localhost:3000/password/updatepassword/${forgetuserid}">
          
          <div class="form-group">
            <label for="password">Set New Password</label>
            <input type="password" id="newpassword" name="password" required>
          </div>
          <div class="form-group">
            <label for='confirmpassword'>Confirm Password</label>
            <input type="password" id="confirmpassword" name="confirmpassword" required>
          </div>
          
          
          <button style="margin-bottom: 5px;" >Submit</button>
          <!-- <button id="forgotpassowrdbtn">Forgot Password?</button> -->
        </form>
      </div>
     
    
</body>
</html>`)

    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({err:err})
    })


}

exports.updatePassword=(req,res,next)=>{

    
   console.log(res.body)
   
   
  console.log(req)
  

    const userid=req.params.id;
    console.log(userid);
    
    Forgotpassword.findOne({where:{id:userid}})
    .then((response=>{
        response.update({isActive:false})
       
      return   User.findByPk(response.userId)


    }))
    .then((user)=>{
      bcrypt.hash(updatedpassword,saltrounds,async (err,hash)=>{
        if(err){
           throw new Error(err);
        }
             user.update({
               
               password:hash
       }).then(()=>{
           res.status(201).json({msg:'succussfully created user'})
       })
       .catch(err=>{
        console.log(err)
       })


    })
         
    })


     

}