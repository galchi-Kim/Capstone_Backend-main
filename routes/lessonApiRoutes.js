// lessonApiRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const lessonApiController = require('../controllers/lessonApiController');

const {
    getAllLessons,
    getLessonByNum,
    createLesson,
    updateLesson,
    deleteLesson,
    getLessonsByInstructor
} = require('../controllers/lessonApiController');

// multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${basename}-${uniqueSuffix}${ext}`);
    }
});

const upload = multer({ storage: storage });

router.get('/', getAllLessons);
router.get('/:lesNum', getLessonByNum);
router.get('/instructor/:instNum', lessonApiController.getLessonsByInstructor);
router.post('/', upload.fields([
    { name: 'lesThumbImg', maxCount: 1 },
    { name: 'lesBackgroundImg', maxCount: 1 }
]), createLesson);
router.put('/:lesNum', upload.fields([
    { name: 'lesThumbImg', maxCount: 1 },
    { name: 'lesBackgroundImg', maxCount: 1 }
]), updateLesson);
router.delete('/:lesNum', lessonApiController.deleteLesson);

module.exports = router;