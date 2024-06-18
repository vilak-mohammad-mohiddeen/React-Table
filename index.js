const express= require('express');
const cors=require('cors')
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=express();

app.use(cors());

dotenv.config({path:'./configure.env'})

const userRouter=require('./routes/userRoutes');
app.use('/users',userRouter);

const DB = process.env.DATABASE.replace("<password>",process.env.DATABASE_PASSWORD);
  
 
 
mongoose.connect(DB)
.then(() => {
    console.log('DB connection successful!')
})
.catch(err => {
    console.log('DB connection failed!');
    console.log(err); 
});

app.listen(4000,()=>{
console.log("Runnig on port 4000");
});