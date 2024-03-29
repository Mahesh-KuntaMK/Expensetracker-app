const express=require('express');
const path=require('path');
const bodyParser=require('body-parser')
require('dotenv').config();
const app=express();
const cors = require('cors');
const FrontendRoute=require('./routes/frontend.js')
const expanseRoute=require('./routes/expense.js');
const premiumfeatureRoute=require('./routes/premium.js');
const passwordresetRoute=require('./routes/passwordreset.js')

const premiumRoute=require('./routes/purchase.js')
const sequelize=require('./util/database.js');
const Expense=require('./models/expense.js');
const User=require('./models/user.js');
const Order = require('./models/order.js');
const Forgotpassword=require('./models/forgotpassword.js');
const Fileurlsdownloaded=require('./models/fileurlsdownloaded');



//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

User.hasMany(Fileurlsdownloaded);
Fileurlsdownloaded.belongsTo(User);

app.use(express.static(path.join(__dirname,'public')))
app.use(FrontendRoute);
app.use('/expense',expanseRoute);
app.use('/purchase',premiumRoute);
app.use('/premium',premiumfeatureRoute);
app.use('/password',passwordresetRoute);
sequelize.sync()
.then(()=>{
    app.listen(3000)
})
.catch(err=>{
    console.log('err',err)
})
