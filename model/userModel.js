
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    userId: Number,

    full_name: String,

    email: String,

    gender: String,

    phone_number: Number,

    address: String,

    company: String,

    bank_balance: Number,

    credit_card: Boolean,

    pricing: Number

});

const userModel =mongoose.model('user',userSchema);

module.exports=userModel;