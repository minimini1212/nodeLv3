import { UsersService } from '../services/users.service.js';

export class UsersController {
  usersService = new UsersService();

  /** 회원가입 api */
  SignUp = async (req, res, next) => {
    try {
      const { email, name, password, confirmPassword } = req.body;
      if (!email || !name || !password || !confirmPassword) {
        const errors = new Error('입력란을 확인해주세요.');
        errors.statusCode = 400;
        throw errors
      }
      const user = await this.usersService.createUser(
        email,
        name,
        password,
        confirmPassword,
      );

      const createUser = {
        email: user.email,
        name: user.name,
      };

      return res.status(201).json({ createUser });
    } catch (err) {
      next(err);
    }
  };

  /** 로그인 api */
  SignIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        const errors = new Error('입력란을 확인해주세요.');
        errors.statusCode = 400;
        throw errors
      }
      const user = await this.usersService.getUser(email, password);
      const token = user.token;
      return res.status(200).json({
        token,
        message: '로그인에 성공하였습니다.',
      });
    } catch (err) {
      next(err);
    }
  };
}
