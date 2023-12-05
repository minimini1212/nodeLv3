import 'dotenv/config';
import express from 'express';
const app = express();
import user from './routers/users.router.js';
import products from './routers/products.router.js';
import auths from './routers/auth.router.js';
import errorMiddleware from './middlewares/error-handler.middleware.js';

app.use(express.json());

app.use('/api', express.urlencoded({ extended: false }), user);
app.use('/api', auths);
app.use('/api', products);
app.use(errorMiddleware);

app.listen(8080, () => {
  console.log('서버가 요청을 받을 준비가 됐어요');
});
