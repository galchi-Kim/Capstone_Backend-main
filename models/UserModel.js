const db = require('../db');

// 위치 저장
const updateLocation = (userNum, location1, location2) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE user SET userlocation1 = ?, userlocation2 = ? WHERE userNum = ?';
    db.query(sql, [location1, location2, userNum], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// 위치 불러오기
const getLocationFromDB = (userNum, callback) => {
  const sql = 'SELECT userlocation1, userlocation2 FROM user WHERE userNum = ?';
  db.query(sql, [userNum], callback);
};

// 비밀번호 변경 (현재 비밀번호 확인 후 업데이트)
const verifyPasswordAndUpdate = (userNum, currentPw, newPw, callback) => {
  const checkSql = 'SELECT * FROM user WHERE userNum = ? AND userPw = ?';
  db.query(checkSql, [userNum, currentPw], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, false);

      const updateSql = 'UPDATE user SET userPw = ? WHERE userNum = ?';
      db.query(updateSql, [newPw, userNum], (updateErr, updateResult) => {

            if (updateErr) return callback(updateErr);
            return callback(null, true);
        });
    });
};

const findInstructorByName = (instName, callback) => {
  const sql = `
        SELECT userName, userImg, userinfo, DATE_FORMAT(userBirth, '%Y-%m-%d') AS userBirth 
        FROM user 
        WHERE userName = ? AND userRole = '강사'
    `;
    db.query(sql, [instName], (err, results) => {
        if (err) return callback(err);
        if (results.length === 0) return callback(null, null);
        callback(null, results[0]);
    });
};

const getLessonsByInstructorName = (instName, callback) => {
    const sql = `
        SELECT 
            l.lesNum, l.lesName, l.lesDetailPlace, l.lesThumbImg, 
            l.lesinfo, l.lesPrice, l.lesTime, l.lesLevel, 
            u.userName AS instName
        FROM lesson l
        JOIN user u ON l.instNum = u.userNum
        WHERE u.userName = ? 
    `;
    db.query(sql, [instName], callback);
};

const updateUserinfo = (userNum, updatedInfo, callback) => {
    const sql = `
        UPDATE user SET 
            userName = ?,
            userEmail = ?,
            userGender = ?,
            userBirth = ?,
            userHealthInfo = ?
        WHERE userNum = ?`;

    const params = [
        updatedInfo.userName,
        updatedInfo.userEmail,
        updatedInfo.userGender,
        updatedInfo.userBirth,
        updatedInfo.userHealthInfo,
        userNum
    ];

    db.query(sql, params, callback);
};

const findUserByEmailAndPassword = (email, pw, callback) => {
    const sql = 'SELECT * FROM user WHERE userEmail = ? AND userPw = ?';
    db.query(sql, [email, pw], callback);
};

const updateProfileInfo = (userNum, updatedInfo, callback) => {
    const sql = `
        UPDATE user 
        SET userName = ?, userHealthInfo = ?
        WHERE userNum = ?`;
    const params = [updatedInfo.userName, updatedInfo.userHealthInfo, userNum];
    db.query(sql, params, callback);
};

module.exports = {
  updateLocation,
  getLocationFromDB,
  verifyPasswordAndUpdate,
  findInstructorByName,
  getLessonsByInstructorName,
  updateUserinfo,
  findUserByEmailAndPassword,
  updateProfileInfo
};