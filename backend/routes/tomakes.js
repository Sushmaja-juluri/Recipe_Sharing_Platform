const router = require('express').Router();
const tomakeController = require('../controllers/tomakesController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/', authenticate, tomakeController.getAllTomakes);
router.get('/:id', authenticate, tomakeController.getTomakeById);
router.post('/', authenticate, tomakeController.createTomake);
router.patch('/:id', authenticate, tomakeController.updateTomake);
router.delete('/:id', authenticate, tomakeController.deleteTomake);

module.exports = router;
