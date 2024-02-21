const express=require('express');
const path=require('path');
const bodyParser=require('body-parser')
const app=express();
const cors = require('cors');
const FrontendRoute=require('./routes/frontend.js');

const sequelize=require('./util/database.js')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname,'public')))
app.use(FrontendRoute);
sequelize.sync({force:true})
.then(()=>{
    app.listen(3000)
})
.catch(err=>{
    console.log('err',err)
})
