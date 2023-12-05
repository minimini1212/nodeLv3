import { ProductsService } from '../services/products.service.js';

export class ProductsController {
  productsService = new ProductsService();

  /** 상품 생성 api */
  createProduct = async (req, res, next) => {
    try {
      const { title, content, } = req.body;
      const status = 'FOR_SALE';

      const createdProduct = await this.ProductsService.createProduct(
        title,
        content,
        status,
      );

      return res.status(201).json({ data: createdProduct });
    } catch (err) {
      console.log(err);
    }
  };

  /** 상품 목록 조회 api */
  getProducts = async (req, res, next) => {
    try {
      const products = await this.productsService.findAllProducts();

      return res.status(200).json({ data: products });
    } catch (err) {
      console.log(err);
    }
  };

  /** 상품 상세 조회 api */

  getProductById = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await this.productsService.getProductById();

      return res.status(200).json({ data: product });
    } catch (err) {
      console.log(err);
    }
  };

  /** 상품 수정 api */

  updateProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { title, content, status } = req.body;

      const updatedProduct = await this.productsService.updateProduct(
        title,
        content,
        status,
      );

      return res.status(200).json({ data: updatedProduct });
    } catch (err) {
      console.log(err);
    }
  };

  /** 상품 삭제 api */

  deleteProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const deleteProduct = await this.productsService.deleteProduct();

      return res.status(200).json({ data: deleteProduct });
    } catch (err) {
      console.log(err);
    }
  };
}
