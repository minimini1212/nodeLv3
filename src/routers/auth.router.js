import express from 'express';
const router = express.Router();
import { UserController } from '../controllers/auth.controller.js';


const userController = new UserController();

// 내정보 조회하는 API
router.get('/users/me', userController.getUser);

export default router;