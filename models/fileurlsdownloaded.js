const Sequelize=require('sequelize');
const sequelize=require('../util/database');



const Fileurlsdownloaded=sequelize.define('fileurlsdownloaded',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    urls:{
       type: Sequelize.STRING,
        
    },
    date:{
        type:Sequelize.DATE
    }
},{
    timestamps:true
})

module.exports=Fileurlsdownloaded;