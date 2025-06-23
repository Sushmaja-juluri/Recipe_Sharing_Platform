const tomakeRouter = require('express').Router();
const tomakesController = require('../controllers/tomakesController');
const { authenticate } = require('../middlewares/authMiddleware');

tomakeRouter.get('/', authenticate, tomakesController.getAllTomakes);

tomakeRouter.get('/:id', authenticate, tomakesController.getTomakeById);

tomakeRouter.post('/', authenticate, tomakesController.createTomake);

tomakeRouter.patch('/:id', authenticate, tomakesController.updateTomake);

tomakeRouter.delete('/:id', authenticate, tomakesController.deleteTomake);


module.exports = tomakeRouter;