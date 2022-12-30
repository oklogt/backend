const mongoose= require('mongoose');
const passport = require('passport')


const citySchema=new mongoose.Schema({
    usergoogleid:String,
    cityname: String,
    cordinateX:Number,
    cordinateY:Number
    
})

module.exports=mongoose.model('City',citySchema);