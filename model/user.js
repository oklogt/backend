const mongoose= require('mongoose');
const passport = require('passport')


const userSchema=new mongoose.Schema({
    username: String,
    email: String,
    googleid:String
})

module.exports=mongoose.model('User',userSchema);