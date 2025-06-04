const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/location', userController.saveLocation);
router.get('/location/:userNum', userController.getLocation);
router.delete('/delete/:userNum', userController.deleteUser); 
router.post('/update-name', userController.updateUserName);
router.post('/update-password', userController.updatePassword);
router.get('/instructor/:instName', userController.getInstructorByName);
router.get('/instructor/:instName/lessons', userController.getLessonsByInstructorName);
router.post('/updateCareer', userController.updateUserInfo);
router.put('/:userNum', userController.updateProfileInfo);

module.exports = router;