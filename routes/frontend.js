const express=require('express');

const authController=require('../middleware/authentication.js');
const routes=express.Router();
 
const frontendController=require('../controllers/frontendController.js');



routes.get('/',frontendController.signup);
routes.get('/user/createaccount',frontendController.createaccount);
routes.post('/user/signup',frontendController.usersignup);
routes.get('/user/loginpage',frontendController.login);
routes.post('/user/login',frontendController.userlogin);
routes.get('/user/login',frontendController.login);
routes.get('/password/forgotpassword',frontendController.forgotPassword);

routes.post('/password/forgotpassword',frontendController.resetPassword);
//routes.get('/getpremium',authController.authentication,frontendController.getpremium);




module.exports=routes;