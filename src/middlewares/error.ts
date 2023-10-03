import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import mapJoiStatusError from '../utils/mapJoiStatusError';

function error(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (err.name === 'ValidationError') {
    console.error(err);
    const { details } = err as Joi.ValidationError;
    const { type, message } = details[0];

    return res.status(mapJoiStatusError(type)).json({ message });
  }
  if (err.name === 'Unauthorized') {
    return res.status(401).json({ message: err.message });
  }
  console.error(err);
  return res.status(500).json({ message: `Internal server error: ${err.message}` });
}

export default error;