import {Request, Response , NextFunction} from 'express'
import { HttpError } from '../exceptions/httpError';
import { errorResponse } from '../utils/responses';
import logger from '../utils/logger';
import { prisma } from '../utils/prisma';

export const  errorMiddleware = async (err: HttpError, req: Request, res: Response, next: NextFunction) => {

    errorResponse(res, err.status,err.errorName, err.message, err.stack);
    logger.error(err.stack);
     // Log authentication
        await prisma.activityLog.create({
          data: {
            action: `ERROR ${err.status} ${err.errorName}`,
            details: `${err.stack}`
        }
})
}