import express from 'express';
const router = express.Router();
import { ProductsController } from '../controllers/products.controller.js';

const productsController = new ProductsController(); //ProductsController를 인스턴스화 시킨다.

// 상품 생성 api
router.post('/products', productsController.createProduct);


// 상품 목록 조회 api
router.get('/products', productsController.getProducts);


// 상품 상세 조회 api
router.get('/products/:productId', productsController.getProductById);

// 상품 수정 api
router.put('/products/:productId/', productsController.updateProduct);

// 상품 삭제 api
router.delete('/products/:productId/', productsController.deleteProduct);

export default router;