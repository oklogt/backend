const passport=require('passport');
const GoogleStrategy =require ('passport-google-oauth20').Strategy;

const User =require('../model/user')
const GOOGLE_CALLBACK="http://localhost:5000/api/auth/google/callback";


passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK,
    passReqToCallback:true
},async(req,accessToken, refreshToken,profile,cb)=>{
    const defaultPlayer={
        name:`${profile.name}`,
        email:profile.emails[0].value,
        id:profile.id
    };
    // const user =await User.create({id:profile.id,name:profile.name,email:profile.emails[0].value})
    //     .catch((err)=>{
    //         console.log("error in sign up",err);
    //         cb(err,null);
    //     });
    // if(user && user[0])
    //     return cb(null,user && user[0]);    
}));



passport.serializeUser((user,cb)=>{
    console.log("serial player",user);
    cb(null,user.id);
});
passport.deserializeUser(async(id,cb)=>{
    const user= await User.findOne({where:id})
    .catch((err)=>{
        console.log("error in sign up",err);
        cb(err,null);
    })
    console.log("deserial player",user);
    if(user) cb(null,user);
});