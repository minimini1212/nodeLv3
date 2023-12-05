import { UsersRepository } from '../repositories/users.repository.js';
import bcrypt from 'bcrypt';

export class UsersService {
  usersRepository = new UsersRepository();

  //회원가입
  createUser = async (email, name, password, confirmPassword) => {
    const user = await this.usersRepository.createUser(email, name, password);
    const salt = 12;

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
    if (!checkEmail(user.email)) {
      throw new Error('이메일 형식을 맞춰주세요');
    }

    // checkPwd 함수를 이용한 패스워드 조건을 만족하는가
    if (!checkPwd(user.password)) {
      throw new Error('password는 최소 6자리 이상이어야 합니다.');
    }

    // 패스워드, 패스워드 검증 값이 일치하는가
    if (user.password !== confirmPassword) {
      throw new Error('password와 confirmPassword가 일치하지 않습니다.');
    }

    // email 또는 name 포함하는 객체찾기
    const existUser = await this.usersRepository.findUser(email, name);
    if (existUser) {
      throw new Error('Email이나 name이 이미 사용 중입니다.');
    }

    // 비밀번호 암호화
    const hashPassword = bcrypt.hashSync(user.password, salt);

    const createUser = {
      email: user.email,
      name: user.name,
      passwor: hashPassword,
    };

    return createUser;
  };
}
