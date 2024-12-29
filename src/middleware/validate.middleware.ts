import type { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { errorResponse } from '../utils/responses';
import { InvalidInputException } from '../exceptions/exceptions';
import UtitlitiesHelper from '../utils/utilitiesHelper';


export const validateSchema = <T>(schema: ZodSchema<T>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result =    schema.parse(req.body);
      // req.body = result.data;

      // if(!result.success){
      //   // return  next(new  InvalidInputException(`Data schema validation failed`))

      //   return next(new InvalidInputException('Invalid Input Exception',UtitlitiesHelper.formatZodError(result?.data.errors)));

        
      // }


      next();        

    } catch (error) {
      if (error instanceof ZodError){

        console.log('ZodError error',error.errors);
        return  next(new InvalidInputException('Invalid Input Exception',UtitlitiesHelper.formatZodError(error)))

        
    }
      res.status(400).json({ message: error });
      errorResponse(res, 400, "InternalServerErrorException", "Something went wrong", error);

    }
  };
}