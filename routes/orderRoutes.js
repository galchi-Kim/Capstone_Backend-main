const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder); 
router.get('/:userId', orderController.getOrdersByUser); 
router.delete('/:userId/:lessonId', orderController.deleteOrder);

module.exports = router;
