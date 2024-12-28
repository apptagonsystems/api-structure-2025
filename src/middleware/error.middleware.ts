import {Request, Response , NextFunction} from 'express'
import { HttpError } from '../exceptions/httpError';
import { errorResponse } from '../utils/responses';

export const  errorMiddleware = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    // res.status(err.status).json({
    //     message: err.message,
    //     errorCode: err.status,
    //     name: err.errorName,
    //     stack: err.stack
    // });

    errorResponse(res, err.status,err.errorName, err.message, err.stack);
}