const Resource = require("../model/resource")

const getuserresource=async(req,res)=>{
    const{usergoogleid}=req.body
    if(!usergoogleid){
        return res.status(400).json({message:"資料不完整"})
    }
    let resource=await Resource.findOne({usergoogleid:usergoogleid}).lean().exec()
    if(resource){
        return res.json(resource)
    }else{
        console.log(usergoogleid)
        const resourceObject={usergoogleid:usergoogleid,wood:60,food:60,stone:60,gold:60}

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