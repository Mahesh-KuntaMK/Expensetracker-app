const express=require('express');

const routes=express.Router();
 
const frontendController=require('../controllers/frontendController.js');



routes.get('/',frontendController.signup)
routes.post('/user/signup',frontendController.usersignup)





module.exports=routes;