const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const userRoutes = require('./routes/userRoutes');  
const lessonRoutes = require('./routes/lessonRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const orderRoutes = require('./routes/orderRoutes');
const applicationRoutes  = require('./routes/applicationRoutes');
const lessonApiRoutes = require('./routes/lessonApiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/api/notifications', require('./routes/notificationRoutes'));

// 미들웨어 설정
app.use(cors()); // 모든 요청 허용
app.use(express.json()); // JSON 파싱

// 정적 이미지 파일 경로 설정
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

// api로 시작하는 요청을 authRoutes 파일의 라우팅으로 전달
app.use('/api', authRoutes);

// 기본 라우트
app.get('/', (req, res) => {
    res.send('파크골프 레슨 예약 앱 서버 실행 중');
});

app.use('/api/lessons', lessonRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/favorite', favoriteRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/lesson-api', lessonApiRoutes);

// 서버 실행
app.listen(5000, '0.0.0.0', () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});