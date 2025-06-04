const express = require('express');
const router = express.Router();
const {
  createApplication,
  updateApplicationStatus,
  getApplications,
  getApplicationsByInstructor,
  getApplicationDetail,
  getApplicationCountsByStatus
} = require('../controllers/applicationController');

// 신청 등록
router.post('/', createApplication);

// 상태 변경
router.put('/:appId/status', updateApplicationStatus);

// 신청 목록 조회 (필터링)
router.get('/', getApplications);

// 강사용 신청자 리스트 조회
// 예: GET /api/application/instructor/1
router.get('/instructor/:instNum', getApplicationsByInstructor);

// 신청 상세 조회
// 예: GET /api/application/5
router.get('/:appId', getApplicationDetail);

// 상태별 신청 수 조회
// 예: GET /api/application/count/byStatus/3
router.get('/count/byStatus/:instNum', getApplicationCountsByStatus);

module.exports = router;