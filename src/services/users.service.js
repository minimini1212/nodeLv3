import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UsersService {
  usersRepository = new UsersRepository();

  //회원가입
  createUser = async (email, name, password, confirmPassword) => {

    // 회원가입 비밀번호 조건
    function checkPwd(str_pwd) {
      const reg = /^[A-Za-z\d@$!%*#?&]{6,}$/;
      return reg.test(str_pwd); //정규식과 매치되면 true, 매치되지않으면 false 반환.
    }

    //회원가입 이메일 조건
    function checkEmail(str_email) {
      const reg = /^[A-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
      return reg.test(str_email);
    }

    // checkEmail 함수를 이용한 이메일 조건을 만족하는가
    if (!checkEmail(email)) {
      const errors = new Error('이메일 형식을 맞춰주세요');
        errors.statusCode = 400;
        throw errors
    }

    // checkPwd 함수를 이용한 패스워드 조건을 만족하는가
    if (!checkPwd(password)) {
      const errors = new Error('비밀번호는 최소 6자리 이상이어야 합니다.');
        errors.statusCode = 400;
        throw errors
      
    }

    // 패스워드, 패스워드 검증 값이 일치하는가
    if (password !== confirmPassword) {
      const errors = new Error('비밀번호가 일치하지 않습니다.');
        errors.statusCode = 409;
        throw errors
    }

    // email을 포함하는 객체찾기
    const existUser = await this.usersRepository.findUser(email);
    if (existUser) {
      const errors = new Error('email이 이미 사용 중입니다.');
        errors.statusCode = 409;
        throw errors
    }
    // 비밀번호 암호화
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS));

    const user = await this.usersRepository.createUser(
      email,
      name,
      hashPassword,
    );

    return user;
  };

  //로그인
  getUser = async (email, password) => {
    const existUser = await this.usersRepository.findUser(email);
    if (!existUser) {
      const errors = new Error('사용자가 존재하지 않습니다.');
        errors.statusCode = 400;
        throw errors
    }
    // 데이터베이스에 저장된 해싱된 비밀번호와 입력된 password를 비교 match가 true면 일치
    const match = bcrypt.compareSync(password, existUser.password);
    if (!match) {
      const errors = new Error('비밀번호가 일치하지 않습니다.');
        errors.statusCode = 400;
        throw errors
    }
    // 토큰의 만료시간 설정 12시간..
    const token = jwt.sign(
      { userId: existUser.userId },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: '12h',
      },
    );
    const user = {
      token
    }
   
      return user;
  };
}
