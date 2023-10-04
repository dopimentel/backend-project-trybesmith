import Joi from 'joi';
import schemas from '../../utils/schemas';
import { OrderBody } from '../../database/models/order.model';

const validateOrder = (orderData: OrderBody): Joi.ValidationError | void => {
  const { error } = schemas.createOrderSchema.validate(orderData);
  if (error) throw error;
};

export default validateOrder;
