const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match:[/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/]
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
         }
},);

module.exports = mongoose.model('User', userSchema);