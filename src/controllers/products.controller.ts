import { Request, Response } from 'express';
import productsService from '../services/products.service';

async function getAll(req: Request, res: Response) {
  const serviceResponse = await productsService.getAll();
  res.status(200).json(serviceResponse);
}

async function create(req: Request, res: Response) {
  const serviceResponse = await productsService.create(req.body);
  res.status(201).json(serviceResponse);
}

export default {
  getAll,
  create,
};