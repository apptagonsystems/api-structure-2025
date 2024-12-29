import { NextFunction, Request, Response } from "express";
import { HttpError } from "../exceptions/httpError";
import { InternalServerErrorException, InvalidInputException } from "../exceptions/exceptions";
import { ZodError } from "zod";
import UtitlitiesHelper from "./utilitiesHelper";

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {
            await method(req, res, next);
        } catch (error:any) {
            console.log('ZodError error: any',error);

            let exception: HttpError;
            if(error instanceof HttpError) {
                exception = error;
            }
            else if (error instanceof ZodError){

                console.log('ZodError error',error);
                exception = new InvalidInputException('Invalid Input Exception',UtitlitiesHelper.formatZodError(error.issues));

                
            }
             else{
                exception = new InternalServerErrorException('Internal Exception');
            }
            next(exception);
        }
    }
}