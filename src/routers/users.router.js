import express from 'express';
const router = express.Router();
import { UsersController } from '../controllers/users.controller.js';

const usersController = new UsersController();

// 회원가입 API
router.post('/sign-up', usersController.SignUp);

// 로그인 API
router.post('/sign-in', usersController.SignIn);

export default router;