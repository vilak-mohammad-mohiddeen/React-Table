const express= require('express');
const userRouter=require('./routes/userRoutes');
const cors=require('cors')
const mongoose=require('mongoose');
const app=express();

app.use(cors());


app.use('/users',userRouter);

const DB = "mongodb+srv://Mohiddeen:Moinzaheer@userscardata.ftyxdic.mongodb.net/?retryWrites=true&w=majority&appName=UsersCarData";
  
 
 
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