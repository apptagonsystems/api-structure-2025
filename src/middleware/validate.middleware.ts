import type { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { errorResponse } from '../utils/responses';
import { InvalidInputException } from '../exceptions/exceptions';


export const validateSchema = <T>(schema: ZodSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result =    schema.safeParse(req.body);
      req.body = result.data;

      if(!result.success){
        return  next(new  InvalidInputException(`Data schema validation failed`))
        
        }
        
        next();

    } catch (error) {
      res.status(400).json({ message: error });
      errorResponse(res, 400, "InternalServerErrorException", "Something went wrong", error);

    }
  };
}