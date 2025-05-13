const db = require('../db');

// 군구별 레슨 조회
const getLessonsByDistrict = (req, res) => {
    const { district } = req.query;

    if (!district) {
        return res.status(400).json({ error: 'district 파라미터가 필요합니다.' });
    }

    const sql = `
        SELECT lesNum, lesName, lesDetailPlace, lesThumbImg, rating
        FROM lesson
        WHERE lesPlace = ?
    `;

    db.query(sql, [district], (err, results) => {
        if (err) {
            console.error('레슨 조회 오류:', err);
            return res.status(500).json({ error: '레슨 데이터를 조회하는 중 오류가 발생했습니다.' });
        }

        res.json(results);
    });
};

module.exports = {
    getLessonsByDistrict
};