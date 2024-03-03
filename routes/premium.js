const express=require('express');

const routes=express.Router();

const premium=require('../controllers/premiumfeatures');

const authController=require('../middleware/authentication')

routes.get('/leaderboard',authController.authentication,premium.leaderboard);



module.exports=routes