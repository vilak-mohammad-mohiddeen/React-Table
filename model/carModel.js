
const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    userId: Number,

    car_model: String,

    car_make: String,

    car_year: Number,

    car_vin: String

});

const carModel= mongoose.model('car',carSchema);

module.exports = carModel;