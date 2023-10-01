import { Request, Response } from 'express';
import loginService from '../services/login.service';

async function login(req: Request, res: Response) {
  const serviceResponse = await loginService.login(req.body);
  res.status(200).json(serviceResponse);
}

export default {
  login,
};