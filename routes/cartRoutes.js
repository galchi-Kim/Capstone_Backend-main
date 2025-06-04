const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// 장바구니 조회
router.get('/:userId', cartController.getCartByUser); 

// 장바구니 추가      
router.post('/', cartController.addToCart);

// 장바구니 삭제                 
router.delete('/:cartId', cartController.removeFromCart);   

// 유저 ID + 레슨 ID로 장바구니 항목 삭제
router.delete('/user/:userId/lesson/:lessonId', cartController.removeByUserAndLesson);

module.exports = router;
