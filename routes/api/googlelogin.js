const express =require('express');
const passport =require('passport');

const router =express.Router();
const succesloginurl="http://localhost:3000/login/loginsuccess"
const failloginurl="http://localhost:3000/login"

router.get("/login/google",passport.authenticate("google",{scope:["profile","email"]}));

router.get("/auth/google/callback",passport.authenticate("google",{
    failureMessage:"cannot login with google",
    failureRedirect:failloginurl,
    successRedirect:succesloginurl
}),(req,res)=>{
    console.log("Player",req.user)
    res.send("thanks for signing in!");
})

module.exports =router;