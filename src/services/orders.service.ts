import OrderModel,
{ GetAllOrderReturn, OrderBody } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import validateOrder from './validations/order.validation';

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

async function create(orderData: OrderBody): Promise<OrderBody | undefined> {
  validateOrder(orderData);
  const { userId, productIds } = orderData;
  const user = await UserModel.findOne({ where: { id: userId } });
  if (!user) {
    return undefined;
  }

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