const db = require('../db');

// 알림 생성
exports.createNotification = ({ userNum, type, message }) => {
    const sql = 'INSERT INTO notification (userNum, type, message) VALUES (?, ?, ?)';
    return db.promise().query(sql, [userNum, type, message]);
};

// 모든 알림 조회 (최신순)
exports.getAllNotifications = (userNum) => {
    const sql = `
        SELECT notiId, message, isRead, createdAt
        FROM notification
        WHERE userNum = ?
        ORDER BY createdAt DESC
    `;
    return db.promise().query(sql, [userNum]).then(([rows]) => rows);
};

// 안 읽은 알림 모두 읽음 처리
exports.markAllAsRead = (userNum) => {
    const sql = `
        UPDATE notification
        SET isRead = TRUE
        WHERE userNum = ? AND isRead = FALSE
    `;
    return db.promise().query(sql, [userNum]);
};

// 안 읽은 알림 존재 여부 확인
exports.hasUnread = async (userNum) => {
    const sql = `
        SELECT COUNT(*) AS unreadCount
        FROM notification
        WHERE userNum = ? AND isRead = FALSE
    `;
    const [rows] = await db.promise().query(sql, [userNum]);
    return rows[0].unreadCount > 0;
};