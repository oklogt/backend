const mongoose= require('mongoose');



const resourceSchema=new mongoose.Schema({
    useremail:String,
    wood:Number,
    food:Number,
    stone:Number,
    gold:Number
},{timestamps:true})

module.exports=mongoose.model('Resource',resourceSchema);