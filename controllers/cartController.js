const CartModel = require('../models/CartModel');

const getCartByUser = (req, res) => {
    const { userId } = req.params;
    CartModel.getCartByUserId(userId, (err, results) => {
        if (err) {
            console.error('장바구니 조회 실패:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        res.json(results);
    });
};

const addToCart = (req, res) => {
    const { userId, lessonId } = req.body;
    CartModel.addToCart(userId, lessonId, (err, result) => {
        if (err) {
            console.error('장바구니 추가 실패:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        res.json({ success: true, cartId: result.insertId });
    });
};

const removeFromCart = (req, res) => {
    const { cartId } = req.params;
    CartModel.removeFromCart(cartId, (err, result) => {
        if (err) {
            console.error('장바구니 삭제 실패:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        res.json({ success: true });
    });
};

const removeByUserAndLesson = (req, res) => {
    const { userId, lessonId } = req.params;
    CartModel.removeByUserAndLesson(userId, lessonId, (err, result) => {
        if (err) {
            console.error('장바구니 삭제 실패:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        res.json({ success: true });
    });
};

module.exports = {
    getCartByUser,
    addToCart,
    removeFromCart,
    removeByUserAndLesson
};
