import { Request, Response, NextFunction } from 'express';

export const errorHandlerMiddleware = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', error);

  return res.status(500).json({ message: 'Internal Server Error' });
};

export default errorHandlerMiddleware;
