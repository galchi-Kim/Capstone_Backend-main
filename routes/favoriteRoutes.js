const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');

// 찜 목록 조회
router.get('/:userId', favoriteController.getFavoritesByUser);

// 찜 추가
router.post('/', favoriteController.addFavorite);

// 찜 삭제
router.delete('/:favoriteId', favoriteController.removeFavorite);

module.exports = router;
