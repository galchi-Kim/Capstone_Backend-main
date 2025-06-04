const LessonModel = require('../models/LessonModel');

const getAllLessons = (req, res) => {
    const { place, level } = req.query;

    LessonModel.findByFilters(place, level, (err, results) => {
        if (err) {
            console.error('레슨 조회 오류:', err);
            return res.status(500).json({ error: '레슨 데이터를 불러오는 중 오류가 발생했습니다.' });
        }
        res.json(results);
    });
};

module.exports = {
    getAllLessons,
};
