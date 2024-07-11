const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    age: Number,
    email: String,
    phone_number: String,
    address: String,
    city: String,
    country: String
});

const userModel=mongoose.model('user',UserSchema);

module.exports = userModel;