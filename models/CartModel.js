const db = require('../db');

const CartModel = {
    getCartByUserId: (userId, callback) => {
        const sql = `
            SELECT 
                c.cartId,
                l.lesNum,
                l.lesName,
                l.lesPrice,
                l.lesThumbImg,
                l.lesPlace,
                l.lesDetailPlace,
                l.lesTime,
                u.userName AS instName,
                u.userImg,
                u.userinfo
            FROM cart c
            JOIN lesson l ON c.lessonId = l.lesNum
            JOIN user u ON l.instNum = u.userNum
            WHERE c.userId = ?
        `;
        db.query(sql, [userId], callback);
    },


    addToCart: (userId, lessonId, callback) => {
        const sql = `INSERT INTO cart (userId, lessonId) VALUES (?, ?)`;
        db.query(sql, [userId, lessonId], callback);
    },

    removeFromCart: (cartId, callback) => {
        const sql = `DELETE FROM cart WHERE cartId = ?`;
        db.query(sql, [cartId], callback);
    },

    removeByUserAndLesson: (userId, lessonId, callback) => {
        const sql = `DELETE FROM cart WHERE userId = ? AND lessonId = ?`;
        db.query(sql, [userId, lessonId], callback);
    }
};

module.exports = CartModel;
