const express=require('express');
const path=require('path');
const bodyParser=require('body-parser')
const app=express();
const cors = require('cors');
const FrontendRoute=require('./routes/frontend.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname,'public')))
app.use(FrontendRoute);

app.listen(3000)
