import { NextFunction, Request, Response } from "express";
import { HttpError } from "../exceptions/httpError";
import { InternalServerErrorException } from "../exceptions/exceptions";

export const errorHandler = (method: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await method(req, res, next);
        } catch (error:any) {
            let exception: HttpError;
            if(error instanceof HttpError) {
                exception = error;
            }else{
                exception = new InternalServerErrorException('Internal Exception');
            }
            next(exception);
        }
    }
}