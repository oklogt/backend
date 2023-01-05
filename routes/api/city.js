const express=require('express');
const router =express.Router();
const cityController=require("../../controllers/cityControler")

router.route("/city")
    .get(cityController.getAllCity)
    .post(cityController.createCity)
    .put(cityController.updateCity)
    .delete(cityController.deleteCity)

router.route("/checkcityowner")
    .post(cityController.checkcityowner)



module.exports=router