const OrderModel = require('../models/OrderModel');
const notificationModel = require('../models/notificationModel');
const ApplicationModel = require('../models/applicationModel');
const lessonModel = require('../models/lessonModel');

const createOrder = (req, res) => {
    const { userId, lessonId } = req.body;

    if (!userId || !lessonId) {
        return res.status(400).json({ error: 'userId 또는 lessonId 누락' });
    }

    OrderModel.addOrder(userId, lessonId, async (err, result) => {
        if (err) {
            console.error('주문 실패:', err);
            return res.status(500).json({ error: '주문 실패' });
        }

        try {
            const [lesson] = await lessonModel.getLessonByIdAsync(lessonId);
            const instNum = lesson.instNum;
            const lesName = lesson.lesName;

            await notificationModel.createNotification({
                userNum: instNum,
                type: '결제완료',
                message: `'${lesName}' 수강생이 결제를 완료했습니다.`
            });

            await ApplicationModel.createApplication({
            userNum: userId,
            instNum,
            lesNum: lessonId,
            status: '승인대기'
        });

            res.status(201).json({ success: true, orderId: result.insertId });
        } catch (err) {
            console.error('신청/알림 생성 실패:', err);
            res.status(201).json({
                success: true,
                orderId: result.insertId,
                warning: '후처리 실패'
            });
        }
    });
};

const getOrdersByUser = (req, res) => {
    const { userId } = req.params;

    OrderModel.getOrdersByUserId(userId, (err, orders) => {
        if (err) {
            console.error('주문 조회 실패:', err);
            return res.status(500).json({ error: '주문 조회 실패' });
        }
        res.json(orders);
    });
};

const deleteOrder = (req, res) => {
    const { userId, lessonId } = req.params;
    OrderModel.deleteOrder(userId, lessonId, (err, result) => {
        if (err) {
            console.error('주문 삭제 실패:', err);
            return res.status(500).json({ error: '삭제 실패' });
        }
        res.json({ success: true });
    });
};

module.exports = {
    createOrder,
    getOrdersByUser,
    deleteOrder
};