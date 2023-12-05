import { prisma } from '../utils/prisma/index.js';

export class ProductRepository {
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

  findAllProducts = async () => {
    const products = await prisma.products.findMany();
    return products;
  };

  getProductById = async productId => {
    const product = await prisma.products.findFirst({
      where: {
        productId: +productId,
      },
    });

    return product;
  };

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
}
