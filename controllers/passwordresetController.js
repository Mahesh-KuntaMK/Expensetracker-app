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
      data.update({isActive:false});
    res.send(`<html>
    <script>
        function formsubmitted(e){
            e.preventDefault();
            console.log('called')
        }
    </script>
    <form action="/password/updatepassword/${forgetuserid}" method="get">
        <label for="newpassword">Enter New password</label>
        <input name="newpassword" type="password" required></input>
        <button>reset password</button>
    </form>
</html>`)
  res.end();
    })
    .catch(err=>{
        console.log(err)
        return res.status(500).json({err:err})
    })


}

exports.updatePassword=(req,res,next)=>{

   
    const {newpassword}=req.query;
    const userid=req.params.id;
    console.log(userid);
    console.log(newpassword);
    console.log(req.query);
    const saltrounds=10;
    
    Forgotpassword.findOne({where:{id:userid}})
    .then((response=>{
      
       
      return  User.findByPk(response.userId)


    }))
    .then((user)=>{
      bcrypt.hash(newpassword,saltrounds,async (err,hash)=>{
        if(err){
           throw new Error(err);
        }
             user.update({
               
               password:hash

       }).then(()=>{
           res.redirect('/user/login')
           
       })
       .catch(err=>{
        console.log(err)
       })


    })
         
    })


     

}