const City = require("../model/city")


const getAllCity= async(req,res)=>{
    const city = await City.find().select().lean()
    if(!city){
        return res.status(400).json({message:"No City found"})
    }
    res.json(city)
}
const createCity= async(req,res)=>{
    const {useremail,username,cityname,cordinateX,cordinateY}=req.body
    if(!useremail||!username||!cityname || !cordinateX || !cordinateY){
        return res.status(400).json({message:"資料不完整"})
    }
    const duplicate = await City.findOne({cordinateX,cordinateY}).lean().exec()
    if(duplicate){
        return res.status(409).json({message:"重複城市"})
    }
    const cityObject ={useremail:useremail,username:username,cityname:cityname,cordinateX:cordinateX,cordinateY:cordinateY,
        sawmillnum:0,farmnum:0,goldminenum:0,stoneminenum:0}
    const city=City.create(cityObject)
    if(city){
        res.status(201).json({message:"success"})

    }else{
        res.status(400).json({message:"failed"})
    }
}
const updateCity= async(req,res)=>{
    const{useremail,method,cordinateX,cordinateY}=req.body
    if(!useremail || !method || !cordinateX || !cordinateY){
        return res.status(400).json({message:"未登入或資料不完整"})
    }
    const city=await City.findOne({cordinateX,cordinateY}).lean().exec()
    var sawmillnum=city.sawmillnum
    var farmnum=city.farmnum
    var goldminenum=city.goldminenum
    var stoneminenum=city.stoneminenum
    if(method==="sawmill"){
        sawmillnum=sawmillnum+1
        let cityupdate=await City.findOneAndUpdate({useremail:useremail,cordinateX:cordinateX,cordinateY:cordinateY},{sawmillnum:sawmillnum},{new:true})
        if(!cityupdate){
            return res.status(400).json({message:"upgrade failed"})
        }else{
            res.status(201).json({message:" upgrade sawmill success"})
        }
    }
    else if(method==="farm"){
        farmnum=farmnum+1
        let cityupdate=await City.findOneAndUpdate({useremail:useremail,cordinateX:cordinateX,cordinateY:cordinateY},{farmnum:farmnum},{new:true})
        if(!cityupdate){
            return res.status(400).json({message:"upgrade failed"})
        }else{
            res.status(201).json({message:" upgrade farm success"})
        }
    }
    else if(method==="goldmine"){
        goldminenum=goldminenum+1
        let cityupdate=await City.findOneAndUpdate({useremail:useremail,cordinateX:cordinateX,cordinateY:cordinateY},{goldminenum:goldminenum},{new:true})
        if(!cityupdate){
            return res.status(400).json({message:"upgrade failed"})
        }else{
            res.status(201).json({message:" upgrade goldmine success"})
        }
    }
    else if(method==="stonemine"){
        stoneminenum=stoneminenum+1
        let cityupdate=await City.findOneAndUpdate({useremail:useremail,cordinateX:cordinateX,cordinateY:cordinateY},{stoneminenum:stoneminenum},{new:true})
        if(!cityupdate){
            return res.status(400).json({message:"upgrade failed"})
        }else{
            res.status(201).json({message:" upgrade stonemine success"})
        }
    }
}
const deleteCity= async(req,res)=>{
    
}

const checkcityowner=async(req,res)=>{
    const {cordinateX,cordinateY}=req.body
    if(!cordinateX || !cordinateY){
        return res.status(400).json({message:"資料不完整"})
    }
    const city = await City.find({cordinateX,cordinateY}).select("username farmnum sawmillnum goldminenum stoneminenum").lean()
    if(!city){
        return res.status(400).json({message:"No City found"})
    }else{
        res.json(city)
    }
    
}


module.exports={
    getAllCity,
    createCity,
    updateCity,
    deleteCity,
    checkcityowner
}