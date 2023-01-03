const mongoose= require('mongoose');



const citySchema=new mongoose.Schema({
    useremail:String,
    username:String,
    cityname: String,
    cordinateX:Number,
    cordinateY:Number
    
})

module.exports=mongoose.model('City',citySchema);