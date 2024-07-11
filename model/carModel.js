const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    id: Number,
    user_id:Number,
    car_make: String,
    car_model: String,
    car_year: Number,
    car_vin: String,
    card_type: String,
    credit_card: String
});

const carModel=mongoose.model('car',CarSchema);

module.exports = carModel;