const db = require('../db');

// 지역 + 레벨 필터 조회
const findByFilters = (place, level, callback) => {
    let sql = `
        SELECT 
            l.lesNum,
            l.lesName,
            l.lesPrice,
            l.rating,
            l.lesinfo,
            l.lesPlace,
            l.lesDetailPlace,
            l.lesThumbImg,
            l.lesBackgroundImg,
            l.lesTime,
            l.lesLevel,
            u.userName AS instName,
            u.userImg,
            u.userinfo
        FROM lesson l
        JOIN user u ON l.instNum = u.userNum
        WHERE 1=1
    `;
    const params = [];

    if (place) {
        sql += ' AND l.lesPlace = ?';
        params.push(place);
    }

    if (level) {
        sql += ' AND l.lesLevel = ?';
        params.push(level);
    }

    db.query(sql, params, callback);
};

// 레슨 수정
const updateLesson = (lesNum, lessonData, callback) => {
    const sql = `
        UPDATE lesson
        SET lesName = ?, lesinfo = ?, lesLevel = ?, lesPlace = ?, lesDetailPlace = ?,
            lesPrice = ?, lesTime = ?, lesThumbImg = ?, lesBackgroundImg = ?
        WHERE lesNum = ?
    `;
    const values = [
        lessonData.lesName,
        lessonData.lesinfo,
        lessonData.lesLevel,
        lessonData.lesPlace,
        lessonData.lesDetailPlace,
        lessonData.lesPrice,
        lessonData.lesTime,
        lessonData.lesThumbImg,
        lessonData.lesBackgroundImg,
        lesNum
    ];
    db.query(sql, values, callback);
};

const getLessonsByInstructor = (instNum, callback) => {
    const sql = `
        SELECT 
            lesson.*, 
            user.userImg AS userImg, 
            user.userinfo AS userinfo, 
            user.userName AS instName
        FROM lesson
        JOIN user ON lesson.instNum = user.userNum
        WHERE instNum = ?
    `;
    db.query(sql, [instNum], callback);
};

const getLessonById = (lesNum, callback) => {
    const sql = 'SELECT * FROM lesson WHERE lesNum = ?';
    db.query(sql, [lesNum], callback);
};

const getLessonByNum = (lesNum, callback) => {
    const sql = 'SELECT * FROM lesson WHERE lesNum = ?';
    db.query(sql, [lesNum], callback);
};


const createLesson = (lessonData, callback) => {
    const sql = `
        INSERT INTO lesson (
            instNum, lesName, lesinfo, lesPlace,
            lesDetailPlace, lesPrice, lesTime,
            lesThumbImg, lesBackgroundImg, rating, lesLevel
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        lessonData.instNum,
        lessonData.lesName,
        lessonData.lesinfo,
        lessonData.lesPlace,
        lessonData.lesDetailPlace,
        lessonData.lesPrice,
        lessonData.lesTime,
        lessonData.lesThumbImg,
        lessonData.lesBackgroundImg,
        lessonData.rating,
        lessonData.lesLevel
    ];
    db.query(sql, values, callback);
};

const deleteLesson = (lesNum, callback) => {
    const sql = 'DELETE FROM lesson WHERE lesNum = ?';
    db.query(sql, [lesNum], callback);
};

const getLessonByIdAsync = (lesNum) => {
    const sql = 'SELECT * FROM lesson WHERE lesNum = ?';
    return db.promise().query(sql, [lesNum]).then(([rows]) => rows);
};

module.exports = {
    findByFilters,
    updateLesson,
    getLessonsByInstructor,
    getLessonById,
    getLessonByNum,
    createLesson,
    deleteLesson,
    getLessonByIdAsync
};
