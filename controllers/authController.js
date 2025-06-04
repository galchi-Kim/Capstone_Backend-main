const authService = require('../services/authService');
const db = require('../db'); // 비밀번호 직접 업데이트용

// 회원가입
const signup = (req, res) => {
    const { userName, userEmail, userPw, userGender, userBirth, userHealthInfo } = req.body;
    authService.signup(userName, userEmail, userPw, userGender, userBirth, userHealthInfo, (err, result) => {
        if (err) {
            return res.status(500).json({ success: false });
        }

        if (result.exists) return res.status(409).json({ success: false, message: '이미 가입된 이메일입니다.' });

        res.json({
            success: true,
            user: {
                userNum: result.insertId,
                userName,
                userEmail,
                userPw,
                userGender,
                userBirth,
                userHealthInfo,
                userRole: '수강생',
                userImg: 'default_userImg.png'
            }
        });
    });
};


// 로그인
const login = (req, res) => {
    const { userEmail, userPw } = req.body;

    authService.login(userEmail, userPw, (err, result) => {
        if (err) return res.status(500).json({ error: '서버 오류' });

        if (result.success) res.json(result);
        else res.status(401).json({ success: false, message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
    });
};

module.exports = {
    signup,
    login,
};
