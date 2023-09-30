import ProductModel,
{ ProductInputtableTypes, 
  ProductSequelizeModel, CreatedProductReturn } from '../database/models/product.model';

async function getAll(): Promise<ProductSequelizeModel[]> {
  return ProductModel.findAll();
}

async function create(product: ProductInputtableTypes): Promise<CreatedProductReturn> {
  const { id, name, price } = (await ProductModel.create(product)).toJSON();
  return { id, name, price };
}

export default {
  getAll,
  create,
};