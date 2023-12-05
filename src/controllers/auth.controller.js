import { UserService } from '../services/auth.service.js';

export class UserController {
  userService = new UserService();

  getUser = async (req, res, next) => {
    try {
      const user = await this.userService.getUser();

      return res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  };
}
