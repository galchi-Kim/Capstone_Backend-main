const db = require('../db');

const addOrder = (userId, lessonId, callback) => {
    const sql = 'INSERT INTO `order` (userId, lessonId) VALUES (?, ?)';
    db.query(sql, [userId, lessonId], callback);
};

const getOrdersByUserId = (userId, callback) => {
    const sql = `
        SELECT 
            o.orderId,
            o.userId,
            o.lessonId,
            o.orderDate,
            l.lesNum,
            l.lesName,
            l.lesThumbImg,
            l.lesTime,
            l.lesDetailPlace,
            l.lesPrice,
            l.lesinfo,
            l.lesBackgroundImg,
            u.userName AS instName,
            u.userImg,
            u.userinfo
        FROM \`order\` o
        JOIN lesson l ON o.lessonId = l.lesNum
        JOIN user u ON l.instNum = u.userNum
        WHERE o.userId = ?
        ORDER BY o.orderDate DESC
    `;
    db.query(sql, [userId], callback);
};

const deleteOrder = (userId, lessonId, callback) => {
    const sql = 'DELETE FROM `order` WHERE userId = ? AND lessonId = ?';
    db.query(sql, [userId, lessonId], callback);
};

module.exports = {
    addOrder,
    getOrdersByUserId,
    deleteOrder
};
