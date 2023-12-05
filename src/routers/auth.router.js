import express from 'express';
const router = express.Router();

// 내정보 조회하는 API
router.get('/users/me', authMiddleware, async (req, res) => {
  
});

export default router;