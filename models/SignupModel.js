const db = require('../db');

// 이메일 중복 여부 확인
const checkEmailExists = (userEmail, callback) => {
    const sql = 'SELECT * FROM user WHERE userEmail = ?';
    db.query(sql, [userEmail], callback);
};

// 사용자 정보 삽입
const insertUser = (userName, userEmail, userPw, userGender, userBirth, userHealthInfo, callback) => {
    const sql = `
        INSERT INTO user 
        (userName, userEmail, userPw, userGender, userBirth, userHealthInfo)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [
        userName,
        userEmail,
        userPw,
        userGender,
        userBirth,
        JSON.stringify(userHealthInfo)
    ];

    db.query(sql, values, (err, result) => {
    if (err) {
        return callback(err);
    }
    callback(null, result);
});

};

module.exports = {
    checkEmailExists,
    insertUser,
};
