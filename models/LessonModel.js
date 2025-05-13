const db = require('../db');

// 조인
const findAllWithInstructor = (callback) => {
    const sql = `
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
            u.userName AS instName,
            u.userImg,
            u.userinfo
        FROM lesson l
        JOIN user u ON l.instNum = u.userNum
    `;
    db.query(sql, callback);
};


module.exports = {
    findAllWithInstructor,
};
