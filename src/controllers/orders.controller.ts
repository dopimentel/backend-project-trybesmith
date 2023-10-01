import { Request, Response } from 'express';
import ordersService from '../services/orders.service';

async function getAll(req: Request, res: Response) {
  const serviceResponse = await ordersService.getAllWithProducts();
  res.status(200).json(serviceResponse);
}

export default {
  getAll,
};