const SignupModel = require('../models/SignupModel');
const LoginModel = require('../models/LoginModel');

// 회원가입 서비스 로직
// 이메일 중복 체크 후 중복이 아니면 DB에 사용자 정보 저장
const signup = (userName, userEmail, userPw, userGender, userBirth, userHealthInfo, callback) => {
    SignupModel.checkEmailExists(userEmail, (err, results) => {
        if (err) return callback(err);
        
        // 이미 가입된 이메일일 경우 
        if (results.length > 0) {return callback(null, { exists: true });
        }
        // 이메일 중복이 아니면 DB에 사용자 정보 저장
        SignupModel.checkEmailExists(userEmail, (err, results) => {
            if (err) return callback(err);
            if (results.length > 0) return callback(null, { exists: true });

            SignupModel.insertUser(userName, userEmail, userPw, userGender, userBirth, userHealthInfo, (err, result) => {
                if (err) return callback(err);
                callback(null, { success: true, insertId: result.insertId });
            });
        });

    });
};

// 로그인 서비스 로직
// 이메일+비밀번호로 사용자 정보 가져오기
const login = (userEmail, userPw, callback) => {
    LoginModel.findUserByEmailAndPassword(userEmail, userPw, (err, results) => {
        if (err) return callback(err);

        // 사용자 정보가 DB에 있는 경우
        if (results.length > 0) {
            return callback(null, { success: true, user: results[0] });
        } 
        // 사용자 정보가 DB에 없는 경우
        else {
            return callback(null, { success: false });
        }
    });
};

module.exports = {
    signup,
    login,
};
