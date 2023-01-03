const mongoose= require('mongoose');



const userSchema=new mongoose.Schema({
    username: String,
    email: String,
    googleid:String,
    password:String
})

module.exports=mongoose.model('User',userSchema);