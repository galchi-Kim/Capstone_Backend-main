const db = require('../db');

// 로그인 시 이메일, 비밀번호 조회
const findUserByEmailAndPassword = (email, password, callback) => {
    const sql = 'SELECT * FROM user WHERE userEmail = ? AND userPw = ?';
    db.query(sql, [email, password], callback);
};

module.exports = {
    findUserByEmailAndPassword,
};
