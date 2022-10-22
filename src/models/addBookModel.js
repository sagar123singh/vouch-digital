const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({

        name:{
            type:String,
            trim:true,
            required:true
        },
        phone:{
            type:Number,
            trim:true,
            required:true
        },
        city:{
                type:String,
                required:true,
                trim:true
            },
     pinCode:{
                type:Number,
                required:true,
                trim:true
            },
             isDeleted:{
                type:Boolean,
                default:false
             }
        
    
   
});

module.exports = mongoose.model('Address', addressSchema);