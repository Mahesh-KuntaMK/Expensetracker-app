const Sequelize=require('sequelize');

// const sequelize=new Sequelize(process.env.DB_NAME,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
//     host:process.env.DB_HOST,
//     dialect: 'mysql',
//     timezone: '+05:30'
// })
const sequelize=new Sequelize('expense-project','root','Mahesh@1313',{
    host:'localhost',
    dialect: 'mysql',
    timezone: '+05:30'
})

module.exports = sequelize;