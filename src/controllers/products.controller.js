import { ProductsService } from '../services/products.service.js';

export class ProductsController {
  productsService = new ProductsService();

  /** 상품 생성 api */
  createProduct = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const status = 'FOR_SALE';
      const userId = req.user.userId;

      const createdProduct = await this.productsService.createProduct(
        title,
        content,
        status,
        userId,
      );

      const product = {
        title: createdProduct.title,
        content: createdProduct.content,
        status: createdProduct.status,
        userId: createdProduct.UserId,
      };

      return res.status(201).json({ product });
    } catch (err) {
      next(err);
    }
  };

  /** 상품 목록 조회 api */
  getProducts = async (req, res, next) => {
    try {
      let { sort } = req.query;
      const products = await this.productsService.findAllProducts(sort);

      return res.status(200).json({ data: products });
    } catch (err) {
      next(err);
    }
  };

  /** 상품 상세 조회 api */

  getProductById = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await this.productsService.getProductById(productId);

      return res.status(200).json({ data: product });
    } catch (err) {
      next(err);
    }
  };

  /** 상품 수정 api */

  updateProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { title, content, status } = req.body;
      const userId = req.user.userId;
      const updatedProduct = await this.productsService.updateProduct(
        productId,
        title,
        content,
        status,
        userId,
      );

      return res.status(200).json({ data: updatedProduct });
    } catch (err) {
      next(err);
    }
  };

  /** 상품 삭제 api */

  deleteProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const userId = req.user.userId;
      const deleteProduct = await this.productsService.deleteProduct(
        productId,
        userId,
      );

      return res.status(200).json({
        data: deleteProduct.productId,
        message: '상품 삭제에 성공하였습니다.',
      });
    } catch (err) {
      next(err);
    }
  };
}
