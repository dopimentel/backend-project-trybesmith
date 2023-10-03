import Joi from 'joi';
import schemas from '../../utils/schemas';
import { ProductInputtableTypes } from '../../database/models/product.model';

const validateProduct = (productData: ProductInputtableTypes): Joi.ValidationError | undefined => {
  const { error } = schemas.createProductSchema.validate(productData);
  if (error) throw error;
  return error;
};

export default validateProduct;