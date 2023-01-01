const mongoose= require('mongoose');



const resourceSchema=new mongoose.Schema({
    usergoogleid:String,
    wood:Number,
    food:Number,
    stone:Number,
    gold:Number
})

module.exports=mongoose.model('Resource',resourceSchema);