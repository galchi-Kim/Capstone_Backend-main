const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

// 군구별 레슨 조회
router.get('/', lessonController.getLessonsByDistrict);

module.exports = router;
