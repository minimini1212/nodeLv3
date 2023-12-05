import { prisma } from '../utils/prisma/index.js';

export class ProductRepository {
  // 생성
  createProduct = async (title, content, status) => {
    const createdProduct = await prisma.products.create({
      data: {
        title,
        content,
        status,
      },
    });
    return createdProduct;
  };

  //목록 조회
  findAllProducts = async () => {
    const products = await prisma.products.findMany();
    return products;
  };

  //상세 조회
  getProductById = async productId => {
    const product = await prisma.products.findFirst({
      where: {
        productId: +productId,
      },
    });

    return product;
  };

  //수정
  updateProduct = async (productId, title, content, status) => {
    const updatedProduct = await prisma.products.update({
      where: {
        productId: +productId,
      },
      data: {
        title,
        content,
        status,
      },
    });

    return updatedProduct;
  };

  //삭제
  deleteProduct = async productId => {
    const deleteProduct = await prisma.products.delete({
      where: {
        productId: +productId,
      },
    });

    return deleteProduct;
  };
}
