import { NextFunction, Request, Response } from 'express';

function error(err: Error, req: Request, res: Response, _next: NextFunction) {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  if (err.name === 'Unauthorized') {
    return res.status(401).json({ message: err.message });
  }
}

export default error;