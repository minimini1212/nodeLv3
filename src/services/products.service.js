import { ProductRepository } from '../repositories/products.repository.js';

export class ProductsService {
  productRepository = new ProductRepository();

  createProduct = async (title, content, status, userId) => {
    const createdProduct = await this.productRepository.createProduct(
      title,
      content,
      status,
    );

    return {
      productId: createdProduct.productId,
      title: createdProduct.title,
      content: createdProduct.content,
      createdAt: createdProduct.createdAt,
    };
  };

  // password를 제외한 상태로, Controller에게 response 전달한다.
  findAllProducts = async () => {
    const products = await this.productRepository.findAllProducts();

    products.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    return products.map(product => {
      return {
        productId: product.productId,
        title: product.title,
        content: product.content,
        status: product.status,
        createdAt: product.createdAt,
      };
    });
  };

  getProductById = async productId => {
    const product = await this.productRepository.getProductById(productId);

    return {
      title: product.title,
      content: product.content,
      status: product.status,
      createdAt: product.createdAt,
    };
  };

  updateProduct = async (productId, title, content, status) => {
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      throw new Error('존재하지 않는 게시글입니다.');
    }

    await this.productRepository.getProductById(title, content, status);

    const updateProduct = await this.productRepository.getProductById(
      productId,
    );

    return {
      title: updateProduct.title,
      content: updateProduct.content,
      status: updateProduct.status,
    };
  };

  deleteProduct = async productId => {
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      throw new Error('존재하지 않는 게시글입니다.');
    }

    await this.productRepository.deleteProduct(productId);

    return product;
  };
}
