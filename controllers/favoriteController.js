const FavoriteModel = require('../models/FavoriteModel');

const getFavoritesByUser = (req, res) => {
    const { userId } = req.params;
    FavoriteModel.getFavoritesByUserId(userId, (err, results) => {
        if (err) {
            console.error('찜 목록 조회 실패:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        res.json(results);
    });
};

const addFavorite = (req, res) => {
    const { userId, lessonId } = req.body;

    FavoriteModel.checkFavoriteExists(userId, lessonId, (err, results) => {
        if (err) return res.status(500).json({ error: '서버 오류' });

        if (results.length > 0) {
            // 찜 해제
            FavoriteModel.removeFavorite(userId, lessonId, (err) => {
                if (err) return res.status(500).json({ error: '찜 해제 실패' });
                res.json({ success: true, removed: true });
            });
        } else {
            // 찜 추가
            FavoriteModel.addFavorite(userId, lessonId, (err, result) => {
                if (err) return res.status(500).json({ error: '찜 추가 실패' });
                res.json({ success: true, favoriteId: result.insertId });
            });
        }
    });
};

const removeFavorite = (req, res) => {
    const { favoriteId } = req.params;
    FavoriteModel.deleteByFavoriteId(favoriteId, (err, result) => {
        if (err) {
            console.error('찜 삭제 실패:', err);
            return res.status(500).json({ error: '서버 오류' });
        }
        res.json({ success: true });
    });
};
module.exports = {
    getFavoritesByUser,
    addFavorite,
    removeFavorite
};
