const express=require('express');
const router =express.Router();

const playersController=require('../../controllers/playerConstroller')

router.route('/')
    .get(playersController.getAllPlayers)
    .post(playersController.createNewPlayer)
    .put(playersController.updatePlayer)
    .delete(playersController.deletePlayer);

router.route('/:id')
    .get(playersController.getplayer);    

module.exports=router;