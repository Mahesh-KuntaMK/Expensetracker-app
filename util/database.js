const Sequelize=require('sequelize');

const sequelize=new Sequelize('expense-project','root','Mahesh@1313',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '+05:30'
})

module.exports = sequelize;