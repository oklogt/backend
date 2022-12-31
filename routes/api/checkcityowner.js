const express=require('express');
const router =express.Router();
const City = require("../../model/city")


router.route("/checkcityowner").post(async(req,res)=>{
    const {cordinateX,cordinateY}=req.body
    if(!cordinateX || !cordinateY){
        return res.status(400).json({message:"資料不完整"})
    }
    const city = await City.find({cordinateX,cordinateY}).select("username").lean()
    if(!city){
        return res.status(400).json({message:"No City found"})
    }else{
        res.json(city)
    }
})





module.exports=router