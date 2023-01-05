const Resource = require("../model/resource")
const City = require("../model/city")
const getuserresource=async(req,res)=>{
    const{useremail}=req.body
    if(!useremail){
        return res.status(400).json({message:"資料不完整"})
    }
    let resource=await Resource.findOne({useremail:useremail}).lean().exec()
    if(resource){
        return res.json(resource)
    }else{
        console.log(useremail)
        const resourceObject={useremail:useremail,wood:60,food:60,stone:60,gold:60}

        const createresource =await Resource.create(resourceObject)
        if(createresource){
            res.json(createresource)
        }else{
            res.status(400).json({message:"create resource failed"})
        }
    }
}

const updateresource=async(req,res)=>{
    const{useremail,method}=req.body
    if(!useremail || !method){
        return res.status(400).json({message:"未登入或資料不完整"})
    }
    var city =[]
    const currentresource=await Resource.findOne({useremail:useremail}).lean().exec()
    if(!currentresource){
        return res.status(400).json({message:"No resource found"})
    }
    city=await City.find({useremail:useremail}).exec() 
    if(!city){
        return res.status(400).json({message:"No city found"})
    }
    
    var wood=currentresource.wood
    var food=currentresource.food
    var gold=currentresource.gold
    var stone=currentresource.stone
    var totalcity=city.length
    var totalsawmill=0
    var totalfarm=0
    var totalgoldmine=0
    var totalstonemine=0
    for(let i=0;i<city.length;i++){
        totalsawmill=totalsawmill+city[i].sawmillnum
        totalfarm=totalfarm+city[i].farmnum
        totalgoldmine=totalgoldmine+city[i].goldminenum
        totalstonemine=totalstonemine+city[i].stoneminenum
    }
    var currentdate = new Date(); 
    
    var time=Math.round((currentdate-currentresource.updatedAt)/(1000*60))
    console.log(time)
    if(method==="increase"){
        wood=wood+(city.length+totalsawmill)*time
        food=food+(city.length+totalfarm)*time
        gold=gold+(city.length+totalgoldmine)*time
        stone=stone+(city.length+totalstonemine)*time
    }else{
        if(method==="city"){
            wood=wood-1000
            food=food-1000
            gold=gold-1000
            stone=stone-1000
            
        }
        else if(method==="sawmill"){
            wood=wood-60
            food=food-60
        }
        else if(method==="farm"){
            wood=wood-100
        }
        else if(method==="goldmine"){
            wood=wood-100
            food=food-100
        }
        else if(method==="stonemine"){
            wood=wood-100
            food=food-100
        }
    }
    if(wood<0 || food<0 || gold<0 || stone<0){
        return res.status(400).json({message:"資源不足"})
    }
    
    resourceObject={wood:wood,food:food,stone:stone,gold:gold}
    console.log(resourceObject)
    let resourceupdate=await Resource.findOneAndUpdate({useremail:useremail},resourceObject,{new:true})
    if(!resourceupdate){
        return res.status(400).json({message:"No resource found"})
    }else{
        res.status(201).json({message:" update resource success"})
    }

}

module.exports={
    getuserresource,
    updateresource
}