import { Sequelize } from 'sequelize';
import OrderModel,
{ GetAllOrderReturn, OrderBody } from '../database/models/order.model';
import ProductModel from '../database/models/product.model';
import UserModel from '../database/models/user.model';
import validateOrder from './validations/order.validation';
import config from '../database/config/database';

export const sequelize = new Sequelize(config);

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
  const { userId, productIds } = orderData;
  validateOrder(orderData);
  const user = await UserModel.findOne({ where: { id: userId } });
  if (!user) return undefined;
  await sequelize.transaction(async (t) => {
    const order = await OrderModel.create({ userId }, { transaction: t });
    const orderId = order.dataValues.id;
    const products = await ProductModel.findAll({
      where: {
        id: productIds,
      },
      transaction: t,
    });
    const productsPromises = products
      .map((product) => product.update({ orderId }, { transaction: t }));
    await Promise.all(productsPromises);
  });
  return orderData;
}

export default {
  getAllWithProducts,
  create,
};