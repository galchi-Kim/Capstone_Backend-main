const db = require('../db');

const CartModel = {
    getCartByUserId: (userId, callback) => {
        const sql = `
            SELECT 
                c.cartId,
                l.lesName,
                l.lesPrice,
                l.lesThumbImg,
                l.lesPlace,
                l.lesDetailPlace
            FROM cart c
            JOIN lesson l ON c.lessonId = l.lesNum
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
    }
};

module.exports = CartModel;
