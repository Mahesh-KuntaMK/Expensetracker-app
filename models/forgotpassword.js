const Sequelize=require('sequelize');
const sequelize=require('../util/database');



const Forgotpassword=sequelize.define('forgotpassword',{
    id:{
        type:Sequelize.UUID,
        allowNull:false,
        primaryKey:true
    },
    isActive:Sequelize.BOOLEAN
},{
    timestamps:true
})

module.exports=Forgotpassword;