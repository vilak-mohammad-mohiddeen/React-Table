const mongoose=require('mongoose');

const ucarSchema = new mongoose.Schema({
    full_name: String,
    mail: String,
    gender: String,
    phone_number: String,
    address: String,
    bank_balance: Number,
    credit_card: Boolean,
    car_model: String,
    company: String,
    pricing: Number
});

const UcarModel= mongoose.model('UcarData',ucarSchema);

module.exports = UcarModel;



