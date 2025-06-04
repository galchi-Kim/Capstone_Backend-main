const notificationModel = require('../models/notificationModel');

const getAllNotificationsAndMarkAsRead = async (req, res) => {
    const userNum = req.params.userNum;

    try {
        const notifications = await notificationModel.getAllNotifications(userNum);

        await notificationModel.markAllAsRead(userNum);

        res.json(notifications);
    } catch (err) {
        console.error('알림 조회 실패:', err);
        res.status(500).json({ error: '알림 조회 실패' });
    }
};

const checkUnreadNotification = async (req, res) => {
    const userNum = req.params.userNum;
    try {
        const hasUnread = await notificationModel.hasUnread(userNum);
        res.json({ hasUnread });
    } catch (err) {
        console.error('알림 읽음 여부 확인 실패:', err);
        res.status(500).json({ error: '알림 확인 실패' });
    }
};

module.exports = {
    getAllNotificationsAndMarkAsRead,
    checkUnreadNotification
};