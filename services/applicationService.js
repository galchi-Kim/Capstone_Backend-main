const db = require('../db');
const applicationModel = require('../models/applicationModel');

exports.updateApplicationStatus = (appNum, status, callback) => {
    applicationModel.updateStatus(appNum, status, callback);
};

exports.getCountsByStatus = async (instNum) => {
    const [rows] = await db.execute(`
        SELECT status, COUNT(*) as count
        FROM application
        WHERE instNum = ?
        GROUP BY status
    `, [instNum]);

    const result = {};
    rows.forEach(row => {
        result[row.status] = row.count;
    });

    return result;
};