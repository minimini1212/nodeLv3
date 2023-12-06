import express from 'express';
const router = express.Router();
import { UserController } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/need-signin.middleware.js';

const userController = new UserController();

// 내정보 조회하는 API
router.get('/users/me', authMiddleware, userController.getUser);

export default router;