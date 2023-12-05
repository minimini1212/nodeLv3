import { prisma } from '../utils/prisma/index.js';

export class UsersRepository {
  //회원가입
  createUser = async (email, name, password) => {
    const user = await prisma.users.create({
      data: {
        email,
        name,
        password,
      },
    });
    return user;
  };


  //유저 찾기
  findUser = async(email) => {
    const existUser = await prisma.users.findFirst({
      where: {
        email,
        //OR: [{ name }, { email }],
      },
    });
    return existUser;
  }
}
