const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 정적 이미지 파일 경로 설정
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

// 라우터 등록
app.use('/api', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/user', userRoutes);

// 기본 라우트
app.get('/', (req, res) => {
    res.send('파크골프 레슨 예약 앱 서버 실행 중');
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
