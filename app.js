const express=require('express');
const path=require('path');
const bodyParser=require('body-parser')
const fs=require('fs')
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

const helmet=require('helmet');

const compression=require('compression');

const morgan=require('morgan');





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

// const accessLogstream=fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})


// app.use(helmet());

app.use(compression());

// app.use(morgan('combined',{stream:accessLogstream}));

sequelize.sync()
.then(()=>{
    app.listen(3000)
})
.catch(err=>{
    console.log('err',err)
})

// hello is it gng to work or not


///jenkins had been added lets see ot will chnage automitvaty


//yyy now one more time creating cicd deplyment brnahc ro check jenkin