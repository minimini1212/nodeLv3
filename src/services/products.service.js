import { ProductRepository } from '../repositories/products.repository.js';

export class ProductsService {
  productRepository = new ProductRepository();

  //생성
  createProduct = async (title, content, status, userId) => {
    
    const createdProduct = await this.productRepository.createProduct(
      title,
      content,
      status,
      userId,
    );

    return {
      productId: createdProduct.productId,
      title: createdProduct.title,
      content: createdProduct.content,
      createdAt: createdProduct.createdAt,
      userId: createdProduct.userId,
    };
  };

  // 목록 조회
  // password를 제외한 상태로, Controller에게 response 전달한다.
  findAllProducts = async newSort => {

    const products = await this.productRepository.findAllProducts(newSort);
    if (products.length === 0) {
      const errors = new Error('상품이 존재하지 않습니다.');
        errors.statusCode = 404;
        throw errors
    }

    return products.map(product => {
      return {
        productId: product.productId,
        title: product.title,
        content: product.content,
        name: product.User.name,
        status: product.status,
        createdAt: product.createdAt,
      };
    });
  };

  // 상세 조회
  getProductById = async productId => {
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      const errors = new Error('상품이 존재하지 않습니다.');
        errors.statusCode = 404;
        throw errors
    }
    return {
      title: product.title,
      content: product.content,
      name: product.User.name,
      status: product.status,
      createdAt: product.createdAt,
    };
  };

  //수정
  updateProduct = async (productId, title, content, status, userId) => {
    // 저장소(Repository)에게 특정 상품 하나를 요청합니다.
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      const errors = new Error('상품이 존재하지 않습니다.');
        errors.statusCode = 404;
        throw errors
    }

    if (userId !== product.userId) {
      const errors = new Error('작성자가 일치하지 않습니다.');
        errors.statusCode = 401;
        throw errors
    }

    // 저장소(Repository)에게 데이터 수정을 요청합니다.
    await this.productRepository.updateProduct(
      productId,
      title,
      content,
      status,
    );

    // 변경된 데이터를 조회합니다.
    const updateProduct = await this.productRepository.getProductById(
      productId,
    );

    return {
      title: updateProduct.title,
      content: updateProduct.content,
      status: updateProduct.status,
    };
  };

  //삭제
  deleteProduct = async (productId, userId) => {
    // 저장소(Repository)에게 특정 상품 하나를 요청합니다.
    const product = await this.productRepository.getProductById(productId);
    if (!product) {
      const errors = new Error('상품이 존재하지 않습니다.');
        errors.statusCode = 404;
        throw errors
    }
    
    if (userId !== product.userId) {
      const errors = new Error('작성자가 일치하지 않습니다.');
        errors.statusCode = 401;
        throw errors
    }
    // 저장소(Repository)에게 데이터 삭제를 요청합니다.
    await this.productRepository.deleteProduct(productId);

    return product;
  };
}
