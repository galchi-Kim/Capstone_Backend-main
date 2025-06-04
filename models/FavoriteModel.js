const db = require('../db');

const FavoriteModel = {
    getFavoritesByUserId: (userId, callback) => {
        const sql = `
            SELECT
                f.favoriteId,
                f.lessonId AS lessonId,
                l.lesName,
                l.lesPrice,
                l.lesThumbImg,
                l.lesPlace,
                l.lesDetailPlace,
                l.lesTime,
                l.lesinfo,
                l.lesBackgroundImg,
                u.userName AS instName,
                u.userImg,
                u.userinfo
                FROM favorite f
                JOIN lesson l ON f.lessonId = l.lesNum
                JOIN user u ON l.instNum = u.userNum
                WHERE f.userId = ?

        `;
        db.query(sql, [userId], callback);
    },

    addFavorite: (userId, lessonId, callback) => {
        const sql = `INSERT INTO favorite (userId, lessonId) VALUES (?, ?)`;
        db.query(sql, [userId, lessonId], callback);
    },

    removeFavorite: (userId, lessonId, callback) => {
        const sql = `DELETE FROM favorite WHERE userId = ? AND lessonId = ?`;
        db.query(sql, [userId, lessonId], callback);
    },

    deleteByFavoriteId: (favoriteId, callback) => {
        const sql = `DELETE FROM favorite WHERE favoriteId = ?`;
        db.query(sql, [favoriteId], callback);
    },

    checkFavoriteExists: (userId, lessonId, callback) => {
        const sql = `SELECT * FROM favorite WHERE userId = ? AND lessonId = ?`;
        db.query(sql, [userId, lessonId], callback);
    },
};

module.exports = FavoriteModel;
