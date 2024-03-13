const Sequelize=require('sequelize');
const sequelize=require('../util/database');



const Forgotpassword=sequelize.define('forgotpassword',{
    id:{
        type:Sequelize.UUID,
        allowNull:false,
        primaryKey:true
    },
    isActive:{
       type: Sequelize.BOOLEAN,
       defaultValue:true
    }
},{
    timestamps:true
})

module.exports=Forgotpassword;