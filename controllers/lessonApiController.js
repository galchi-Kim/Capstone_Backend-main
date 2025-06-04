const lessonModel = require('../models/LessonModel');

const getAllLessons = (req, res) => {
    lessonModel.getAllLessons((err, results) => {
        if (err) return res.status(500).json({ message: '레슨 목록 조회 실패' });
        res.json(results);
    });
};

const getLessonByNum = (req, res) => {
    const lesNum = req.params.lesNum;
    lessonModel.getLessonByNum(lesNum, (err, results) => {
        if (err) {
            console.error('레슨 상세 조회 실패:', err);
            return res.status(500).json({ message: '서버 오류' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: '레슨이 존재하지 않습니다.' });
        }
        res.json(results[0]);
    });
};
const getLessonsByInstructor = (req, res) => {
    const instNum = req.params.instNum;
    lessonModel.getLessonsByInstructor(instNum, (err, results) => {
        if (err) return res.status(500).json({ message: '강사 레슨 조회 실패' });
        res.json(results);
    });
};


const createLesson = (req, res) => {
    const {
        instNum, lesName, lesinfo, lesLevel,
        lesDetailPlace, lesPrice, lesTime, rating
    } = req.body;

    // 군/구 값만 허용
    const lesPlace = (req.body.lesPlace || '').trim();
    const VALID_PLACES = ['달서구', '달성군', '수성구', '중구', '남구', '북구', '동구', '서구', '군위군'];

    // 잘못된 지역 필터링
    if (!VALID_PLACES.includes(lesPlace)) {
        console.log('잘못된 군/구:', lesPlace);
        return res.status(400).json({ message: '잘못된 지역입니다. 군/구만 허용됩니다.' });
    }

    console.log('레슨 등록 요청값:', req.body);
    console.log('전송된 lesPlace:', lesPlace);

    const lessonData = {
        instNum,
        lesName,
        lesinfo,
        lesLevel,
        lesPlace,
        lesDetailPlace,
        lesPrice,
        lesTime,
        rating,
        lesThumbImg: req.files?.lesThumbImg?.[0]?.filename || 'default_lesThumbImg.png',
        lesBackgroundImg: req.files?.lesBackgroundImg?.[0]?.filename || 'default_background.png'
    };

    console.log('최종 전달할 데이터:', lessonData);

    lessonModel.createLesson(lessonData, (err, result) => {
        if (err) {
            console.error('레슨 등록 실패:', err);
            return res.status(500).json({ message: '레슨 등록 실패' });
        }
        res.status(201).json({ message: '레슨 등록 완료', lessonId: result.insertId });
    });
};




const updateLesson = (req, res) => {
    const lesNum = req.params.lesNum;

    const lesThumbImg = req.files?.lesThumbImg?.[0]?.filename || req.body.originThumb;
    const lesBackgroundImg = req.files?.lesBackgroundImg?.[0]?.filename || req.body.originBg;

    const data = {
        ...req.body,
        lesThumbImg,
        lesBackgroundImg
    };

    lessonModel.updateLesson(lesNum, data, (err) => {
        if (err) return res.status(500).json({ message: '레슨 수정 실패' });
        res.json({ message: '레슨 수정 완료' });
    });
};
const deleteLesson = (req, res) => {
    const lesNum = req.params.lesNum;
    lessonModel.deleteLesson(lesNum, (err) => {
        if (err) return res.status(500).json({ message: '레슨 삭제 실패' });
        res.json({ message: '레슨 삭제 완료' });
    });
};

const getLessonById = (req, res) => {
    const lesNum = req.params.lesNum;
    lessonModel.getLessonById(lesNum, (err, results) => {
        if (err) {
            console.error('레슨 조회 실패:', err);
            return res.status(500).json({ message: '서버 오류' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: '레슨이 존재하지 않습니다.' });
        }
        res.json(results[0]);
    });
};

module.exports = {
    getAllLessons,
    getLessonByNum,
    getLessonsByInstructor,
    createLesson,
    updateLesson,
    deleteLesson,
    getLessonById,
    
};
