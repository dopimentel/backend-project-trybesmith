import ProductModel,
{ ProductInputtableTypes, 
  ProductSequelizeModel, CreatedProductReturn } from '../database/models/product.model';
import validateProduct from './validations/product.validation';

async function getAll(): Promise<ProductSequelizeModel[]> {
  return ProductModel.findAll();
}

async function create(product: ProductInputtableTypes): Promise<CreatedProductReturn> {
  validateProduct(product);
  const result = (await ProductModel.create(product)).toJSON();
  const { id, name, price } = result;
  return { id, name, price };
}

export default {
  getAll,
  create,
};