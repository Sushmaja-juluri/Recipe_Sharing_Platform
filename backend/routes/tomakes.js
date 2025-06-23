const tomakeRouter=require('express').Router();
const tomakesController=require('../controllers/tomakesController');
tomakeRouter.get('/',tomakesController.getAllTomakes);
tomakeRouter.get('/:id',tomakesController.getTomakeById);
tomakeRouter.post('/',tomakesController.createTomake);
tomakeRouter.post('/:id',tomakesController.updateTomake);
tomakeRouter.delete('/:id',tomakesController.deleteTomake);
module.exports=tomakeRouter;