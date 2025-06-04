const db = require('../db');
const userService = require('../services/userService');

const saveLocation = async (req, res) => {
    const { userNum, userlocation1, userlocation2 } = req.body;
    try {
        await userService.saveLocation(userNum, userlocation1, userlocation2);
        res.json({ success: true });  
    } catch (err) {
        console.error('위치 저장 실패:', err);
        res.status(500).json({ error: '위치 저장 실패' });
    }
};

const getLocation = (req, res) => {
    const userNum = req.params.userNum;
    userService.getLocation(userNum, (err, result) => {
        if (err) return res.status(500).json({ error: 'DB 오류' });
        if (!result) return res.status(404).json({ error: '사용자 없음' });
        const { userlocation1, userlocation2 } = result;
        res.json({ userlocation1, userlocation2 });
    });
};

const deleteUser = (req, res) => {
    const userNum = req.params.userNum;
    userService.deleteUser(userNum, (err, result) => {
        if (err) {
            console.error('회원 삭제 실패:', err);
            return res.status(500).json({ success: false, error: 'DB 오류' });
        }
        res.json({ success: true });
    });
};

const updateUserName = (req, res) => {
    const { userNum, userName } = req.body;
    const sql = 'UPDATE user SET userName = ? WHERE userNum = ?';

    db.query(sql, [userName, userNum], (err, result) => {
        if (err) {
            console.error('이름 수정 실패:', err);
            return res.status(500).json({ error: '이름 수정 실패' });
        }
        res.json({ success: true });
    });
};

const updatePassword = (req, res) => {
    const { userNum, currentPw, newPw } = req.body;

    userService.changePassword(userNum, currentPw, newPw, (err, success) => {
        if (err) {
            console.error('비밀번호 변경 실패:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        if (!success) {
            return res.status(401).json({ error: '현재 비밀번호가 올바르지 않습니다.' });
        }
        res.json({ success: true });
    });
};

const getInstructorByName = (req, res) => {
    const instName = req.params.instName;

    userService.findInstructorByName(instName, (err, result) => {
        if (err) {
            console.error('강사 정보 조회 실패:', err);
            return res.status(500).json({ message: '서버 오류' });
        }
        if (!result) {
            return res.status(404).json({ message: '강사를 찾을 수 없습니다.' });
        }
        res.json(result);
    });
};

// 해당 강사가 등록한 레슨 정보 전체 조회
const getLessonsByInstructorName = (req, res) => {
    const instName = req.params.instName;

    userService.findLessonsByInstructorName(instName, (err, results) => {
        if (err) {
            console.error('레슨 목록 조회 실패:', err);
            return res.status(500).json({ message: '서버 오류' });
        }
        res.json(results);
    });
};

const updateUserInfo = (req, res) => {
    const { userNum, userinfo } = req.body;

    userService.updateUserCareer(userNum, userinfo, (err, result) => {
        if (err) {
            console.error('경력 수정 실패:', err);
            return res.status(500).json({ message: '서버 오류' });
        }
        res.json({ message: '경력 업데이트 완료' });
    });
};

const updateProfileInfo = (req, res) => {
    const userNum = req.params.userNum;
    const { userName, userHealthInfo } = req.body;

    userService.updateProfileInfo(userNum, { userName, userHealthInfo }, (err, result) => {
        if (err) {
            console.error('이름/건강정보 수정 실패:', err);
            return res.status(500).json({ message: '서버 오류' });
        }
        res.json({ message: '이름/건강정보 수정 완료' });
    });
};

module.exports = {
    saveLocation,
    getLocation,
    deleteUser,
    updateUserName,
    updatePassword, 
    getInstructorByName,
    getLessonsByInstructorName,
    updateUserInfo,
    updateProfileInfo
};