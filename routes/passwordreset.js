const express=require('express');

const routes=express.Router();


const passwordresetController=require('../controllers/passwordresetController');


routes.get('/resetpassword/:id',passwordresetController.resetPassword);

routes.post('/updatepassword/:id',passwordresetController.updatePassword);



module.exports=routes;


