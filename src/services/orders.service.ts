import OrderModel,
{ GetAllOrderReturn, OrderBody, CreatedOrderReturn } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';

async function getAllWithProducts(): Promise<GetAllOrderReturn> {
  const orders = await OrderModel.findAll();
  const dataValuesPromises = (orders.map((order) => order.toJSON()))
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

async function create(orderData: OrderBody): Promise<CreatedOrderReturn> {
  const { userId, productIds } = orderData;
  const order = await OrderModel.create({ userId });
  const orderId = order.dataValues.id;
  const products = await ProductModel.findAll({
    where: {
      id: productIds,
    },
  });
  const productsPromises = products.map((product) => product.update({ orderId }));
  await Promise.all(productsPromises);
  return { userId, productIds };
}

export default {
  getAllWithProducts,
  create,
};