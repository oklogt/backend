const mongoose= require('mongoose');
const passport = require('passport')
const findorcreate=require('mongoose-findorcreate')

const userSchema=new mongoose.Schema({
    username: String,
    email: String,
    googleid:String
})
userSchema.plugin(findorcreate);

module.exports=mongoose.model('User',userSchema);