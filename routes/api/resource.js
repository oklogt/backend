const express=require('express');
const router =express.Router();
const resourceController=require("../../controllers/resourceController")

router.route("/resource")
    .post(resourceController.getuserresource)
    .put(resourceController.updateresource)

module.exports=router