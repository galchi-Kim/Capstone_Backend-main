const db = require('../db');


// 사용자 정보가 이미 DB에 존재하는지 확인
const checkEmailExists = (email, callback) => {
    const sql = 'SELECT * FROM user WHERE userEmail = ?';
    db.query(sql, [email], callback);
};

// 사용자 정보 DB에 삽입
const insertUser = (userName, userEmail, userPw, callback) => {
    const sql = 'INSERT INTO user (userName, userEmail, userPw) VALUES (?, ?, ?)';
    db.query(sql, [userName, userEmail, userPw], callback);
};

module.exports = {
    checkEmailExists,
    insertUser,
};
