const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Order=sequelize.define('order',{

    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    paymentid:Sequelize.STRING,
    orderid:Sequelize.STRING,
    status:Sequelize.STRING
       
},{
    timestamps:false
})


module.exports=Order