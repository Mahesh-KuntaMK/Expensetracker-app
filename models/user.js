const sequelize = require("../util/database");

const Sequelize=require('sequelize');

const User=sequelize.define('user',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
         username:{
            type:Sequelize.STRING,
            allowNull:false
         },
         email:{
            type:Sequelize.STRING,
            allowNull:false,
            unique: true
         },
         password:{
            type:Sequelize.STRING,
            allowNull:false
         },
         isPremiumUser:Sequelize.BOOLEAN,
         totalExpense:{
           type:Sequelize.INTEGER,
           defaultValue:0
         }

},{
    timestamps:false
})

module.exports=User