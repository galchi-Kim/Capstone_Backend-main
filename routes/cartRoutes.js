const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:userId', cartController.getCartByUser);       // 장바구니 조회
router.post('/', cartController.addToCart);                 // 장바구니 추가
router.delete('/:cartId', cartController.removeFromCart);   // 장바구니 삭제

module.exports = router;
