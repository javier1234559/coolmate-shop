import { Request, Response, NextFunction } from 'express';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export const validationDto = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = plainToInstance(dtoClass, req.body);
      console.log(dto);
      await validateOrReject(dto);
      req.body = dto; 
      next();
    } catch (errors: any) {
      res.status(400).json({
        errors: errors.map(
          (error: any) => error.constraints)
      });
    }
  };
};
