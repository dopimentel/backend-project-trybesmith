import OrderModel, { GetAllOrderReturn } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';

async function getAllWithProducts(): Promise<GetAllOrderReturn> {
  const orders = await OrderModel.findAll();
  const dataValuesPromises = (orders.map((order) => order.dataValues))
    .map(async ({ id, userId }) => {
      const productIds = await ProductModel.findAll({
        where: {
          orderId: id,
        },
        attributes: ['id'],
      }).then((products) => products.map((product) => product.dataValues.id));
      return { id, userId, productIds };
    });

  return Promise.all(dataValuesPromises);
}

export default {
  getAllWithProducts,
};