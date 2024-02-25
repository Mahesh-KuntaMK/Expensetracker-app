const express=require('express');
const path=require('path');
const bodyParser=require('body-parser')
const app=express();
const cors = require('cors');
const FrontendRoute=require('./routes/frontend.js');
const expanseRoute=require('./routes/expense.js');
const sequelize=require('./util/database.js');
const Expense=require('./models/expense.js');
const User=require('./models/user.js');

//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
User.hasMany(Expense);
Expense.belongsTo(User);
app.use(express.static(path.join(__dirname,'public')))
app.use(FrontendRoute);
app.use('/expense',expanseRoute);
sequelize.sync({force:true})
.then(()=>{
    app.listen(3000)
})
.catch(err=>{
    console.log('err',err)
})
