const Resource = require("../model/resource")

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

module.exports={
    getuserresource
}