const QuitModel = require('../models/QuitModel');
const UserModel = require('../models/UserModel');


const saveLocation = async (userNum, userlocation1, userlocation2) => {
    return await UserModel.updateLocation(userNum, userlocation1, userlocation2);
};

const getLocation = (userNum, callback) => {
    UserModel.getLocationFromDB(userNum, callback);
};

const deleteUser = (userNum, callback) => {
    QuitModel.deleteUserFromDB(userNum, callback);
};

const changePassword = (userNum, currentPw, newPw, callback) => {
    UserModel.verifyPasswordAndUpdate(userNum, currentPw, newPw, callback);
};

const findInstructorByName = (instName, callback) => {
    UserModel.findInstructorByName(instName, callback);
};

const findLessonsByInstructorName = (instName, callback) => {
    UserModel.getLessonsByInstructorName(instName, callback);
};

const updateUserCareer = (userNum, userinfo, callback) => {
    UserModel.updateUserinfo(userNum, userinfo, callback);
};

const updateProfileInfo = (userNum, updatedInfo, callback) => {
    UserModel.updateProfileInfo(userNum, updatedInfo, callback);
};

module.exports = {
    saveLocation,
    getLocation,
    deleteUser, 
    changePassword,
    findInstructorByName,
    findLessonsByInstructorName,
    updateUserCareer,
    updateProfileInfo
};