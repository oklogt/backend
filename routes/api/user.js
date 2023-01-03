const express=require('express');
const auth = require('../../middleware/auth');
const router =express.Router();


router.get("/auth/user",auth.isUserAuthenticated,(req,res)=>{
    res.json(req.user);
})
router.post("/register",auth.register);

router.post("/login",auth.login);


module.exports =router;