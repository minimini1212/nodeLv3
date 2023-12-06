export default function (err, req, res, next) {
  // 에러를 출력합니다.
  console.log(err);

  switch (err.message) {
    case '이메일 형식을 맞춰주세요':
      res.status(400).json({ errorMessage: '이메일 형식을 맞춰주세요' });
      break;
    case 'password는 최소 6자리 이상이어야 합니다.':
      res
        .status(400)
        .json({ errorMessage: 'password는 최소 6자리 이상이어야 합니다.' });
      break;
    case 'password와 confirmPassword가 일치하지 않습니다.':
      res.status(400).json({
        errorMessage: 'password와 confirmPassword가 일치하지 않습니다.',
      });
      break;
    case 'email이 이미 사용 중입니다.':
      res.status(409).json({ errorMessage: 'email이 이미 사용 중입니다.' });
      break;
    case '사용자가 존재하지 않습니다.':
      res.status(400).json({ errorMessage: '사용자가 존재하지 않습니다.' });
      break;
    case '비밀번호가 일치하지 않습니다.':
      res.status(400).json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
      break;
    case '상품이 존재하지 않습니다.':
      res.status(400).json({ errorMessage: '상품이 존재하지 않습니다.' });
      break;
    case '작성자가 일치하지 않습니다.':
      res.status(400).json({ errorMessage: '작성자가 일치하지 않습니다.' });
      break;
    case '상품명 또는 상품 내용을 입력해주세요.':
      res.status(400).json({ errorMessage: '상품명 또는 상품 내용을 입력해주세요.' });
      break;
    default:
      res.status(500).json({ errorMessage: '서버 내부 에러가 발생했습니다.' });
  }
}
