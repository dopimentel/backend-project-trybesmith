import Joi from 'joi';
import schemas from '../../utils/schemas';
import { ProductInputtableTypes } from '../../database/models/product.model';

const validateProduct = (productData: ProductInputtableTypes): Joi.ValidationError | void => {
  const { error } = schemas.createProductSchema.validate(productData);
  if (error) throw error;
};

export default validateProduct;