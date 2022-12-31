const City = require("../model/city")


const getAllCity= async(req,res)=>{
    const city = await City.find().select().lean()
    if(!city){
        return res.status(400).json({message:"No City found"})
    }
    res.json(city)
}
const createCity= async(req,res)=>{
    const {usergoogleid,username,cityname,cordinateX,cordinateY}=req.body
    if(!usergoogleid||!username||!cityname || !cordinateX || !cordinateY){
        return res.status(400).json({message:"資料不完整"})
    }
    const duplicate = await City.findOne({cordinateX,cordinateY}).lean().exec()
    if(duplicate){
        return res.status(409).json({message:"重複城市"})
    }
    const cityObject ={usergoogleid,username,cityname,cordinateX,cordinateY}
    const city=City.create(cityObject)
    if(city){
        res.status(201).json({message:"success"})

    }else{
        res.status(400).json({message:"failed"})
    }
}
const updateCity= async(req,res)=>{
    
}
const deleteCity= async(req,res)=>{
    
}

module.exports={
    getAllCity,
    createCity,
    updateCity,
    deleteCity
}