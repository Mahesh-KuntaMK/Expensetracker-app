const express=require('express');

const routes=express.Router();

const premiumController=require('../controllers/premiumController.js');

const authController=require('../middleware/authentication.js');

routes.get('/gopremiumuser',authController.authentication,premiumController.gopremium);

routes.post('/updatepremiumuser',authController.authentication,premiumController.updatepremium)


module.exports=routes