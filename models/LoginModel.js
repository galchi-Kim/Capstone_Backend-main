const db = require('../db');

// 로그인 시 이메일, 비밀번호 조회
const findUserByEmailAndPassword = (email, password, callback) => {
    console.log("🔍 로그인 시도:", email, password); // 전달된 로그인 정보 출력

    const sql = 'SELECT * FROM user WHERE userEmail = ? AND userPw = ?';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error("쿼리 오류:", err);
        } else {
            console.log("쿼리 결과:", result);
        }

        callback(err, result);
    });
};

module.exports = {
    findUserByEmailAndPassword,
};
