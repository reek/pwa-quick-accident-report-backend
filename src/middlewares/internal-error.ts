import { Request, Response, NextFunction } from 'express';

export const internalErrorMiddleware = (err, req: Request, res: Response, next: NextFunction) => {
  // log error
  console.error(`Error: ${err}`);
  res.status(500).json({code: 500, data: err, message: 'Internal Server Error'});
};
