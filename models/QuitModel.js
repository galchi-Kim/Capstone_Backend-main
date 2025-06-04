const db = require('../db');

const deleteUserFromDB = (userNum, callback) => {
    const sql = 'DELETE FROM user WHERE userNum = ?';
    db.query(sql, [userNum], callback);
};

module.exports = {
    deleteUserFromDB,
};
