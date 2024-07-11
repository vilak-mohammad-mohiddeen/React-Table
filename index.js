const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config({path:'./config.env'});
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

const userCarRouter=require('./router/userCarRouter');
app.use('/table',userCarRouter);

const DB=process.env.DATABASE.replace('<password>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB)
.then(() => {
    console.log('DB connection successful!')
})
.catch(err => {
    console.log('DB connection failed!');
    console.log(err); 
});

app.listen(3000,()=>{

    console.log("App is running...");
})