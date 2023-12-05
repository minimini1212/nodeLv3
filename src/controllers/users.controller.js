import { UsersService } from '../services/users.service.js';

export class UsersController {
  usersService = new UsersService();

  /** 회원가입 api */
  SignUp = async (req, res, next) => {
    try {
      const { email, name, password, confirmPassword } = req.body;
      const user = await this.usersService.createUser(
        email,
        name,
        password,
        confirmPassword,
      );

      const createUser = {
        email: user.email,
        name: user.name,
        password: user.passowrd
      }

      return res.status(201).json({user: createUser});
    } catch (err) {
      next(err)
    }
  };

  /** 로그인 api */
  SignIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.usersService.getUser(email, password);

      return user;
    } catch (err) {
      console.log(err);
      res.status(400).json({
        errorMessage: '에러가 발생하였습니다.',
      });
    }
  };
}
