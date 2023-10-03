import { Request, Response } from 'express';
import ordersService from '../services/orders.service';

async function getAll(req: Request, res: Response) {
  const serviceResponse = await ordersService.getAllWithProducts();
  res.status(200).json(serviceResponse);
}

async function create(req: Request, res: Response) {
  const { body } = req;
  const serviceResponse = await ordersService.create(body);
  res.status(201).json(serviceResponse);
}

export default {
  getAll,
  create,
};