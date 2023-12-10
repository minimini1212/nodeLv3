export default function (err, req, res, next) {
  // 에러를 출력합니다.
  switch (err.statusCode) {
    case 400:
      res.status(400).json({ errorMessage: err.message });
      break;
    case 401:
      res.status(401).json({ errorMessage: err.message });
      break;
    case 404:
      res.status(404).json({ errorMessage: err.message });
      break;
    case 409:
      res.status(409).json({ errorMessage: err.message });
      break;  
    default:
      res.status(500).json({ errorMessage: '서버 내부 에러가 발생했습니다.' });
  }
}