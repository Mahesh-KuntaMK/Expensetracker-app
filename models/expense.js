const sequelize = require("../util/database");

const Sequelize=require('sequelize');

const Expense=sequelize.define('expense',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
         amount:{
            type:Sequelize.INTEGER,
            allowNull:false
         },
         category:{
            type:Sequelize.STRING,
            allowNull:false,
           
         },
         description:{
            type:Sequelize.STRING,
            allowNull:false
         },
         date:{
            type:Sequelize.DATE
         }

},{
    timestamps:false
})

module.exports=Expense;