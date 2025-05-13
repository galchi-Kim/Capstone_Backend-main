const express = require('express');
const router = express.Router();
const db = require('../db');

// 사용자 위치 저장
router.post('/location', async (req, res) => {
    const { userNum, userlocation1, userlocation2 } = req.body;

    if (!userNum || !userlocation1 || !userlocation2) {
        return res.status(400).json({ message: '필수 항목 누락' });
    }

    try {
        const [result] = await db.query(
            'UPDATE user SET userlocation1 = ?, userlocation2 = ? WHERE userNum = ?',
            [userlocation1, userlocation2, userNum]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '해당 사용자 없음' });
        }

        res.status(200).json({ message: '위치 저장 성공' });
    } catch (error) {
        console.error('위치 저장 오류:', error.message);
        res.status(500).json({ message: '서버 오류' });
    }
});

// 사용자 위치 조회
router.get('/location/:userNum', async (req, res) => {
    const { userNum } = req.params;

    try {
        const [rows] = await db.query(
            'SELECT userlocation1, userlocation2 FROM user WHERE userNum = ?',
            [userNum]
        );

        res.status(200).json(rows);
    } catch (err) {
        console.error('위치 조회 오류:', err.message);
        res.status(500).json({ message: '위치 불러오기 실패' });
    }
});

module.exports = router;
