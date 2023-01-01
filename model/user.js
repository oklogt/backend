const mongoose= require('mongoose');



const userSchema=new mongoose.Schema({
    username: String,
    email: String,
    googleid:String
})

module.exports=mongoose.model('User',userSchema);