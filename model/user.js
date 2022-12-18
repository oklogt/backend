const mongoose= require('mongoose')
const passport = require('passport')
var findorcreate=require('mongoose-findorcreate')

const userSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    name:{
        type: Object,
        required:true
    },
    email:{
        type:String
    }
})
userSchema.plugin(findorcreate)

module.exports=mongoose.model('user',userSchema)