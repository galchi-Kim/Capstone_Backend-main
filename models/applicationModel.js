const db = require('../db');

exports.updateStatus = (appId, status, callback) => {
    const sql = 'UPDATE application SET status = ? WHERE appId = ?';
    db.query(sql, [status, appId], callback);
};

exports.createApplication = ({ userNum, instNum, lesNum, status }) => {
    const sql = `
        INSERT INTO application (userNum, instNum, lesNum, status)
        VALUES (?, ?, ?, ?)
    `;
    return db.promise().query(sql, [userNum, instNum, lesNum, status]);
};