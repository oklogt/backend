const passport=require('passport');
const GoogleStrategy =require ('passport-google-oauth20').Strategy;

const User =require('../model/user');
const GOOGLE_CALLBACK="http://localhost:5000/api/auth/google/callback";


passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK,
    passReqToCallback:true,
    prompt:"select_account"
},async(req,accessToken, refreshToken,profile,cb)=>{

    const user =await User.findOne({"googleid":profile.id},function(err,user){
        if(err){return cb(err)}
        if(!user){
            user =new User({
                username:profile.displayName,
                email:profile.emails[0].value,
                googleid:profile.id
            });
            user.save(function(err){
                console.log("saving")
                if(err){return cb(err);}
            })
        }else{
            return cb(err,user);
        }
    }).clone().catch(function(err){ console.log(err)})
    
        
      
}));



passport.serializeUser((user,cb)=>{
    console.log("serial player",user);
    cb(null,user);
});
passport.deserializeUser(async(user,cb)=>{
    console.log("deserial player",user);
    if(user) cb(null,user);
});