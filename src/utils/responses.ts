import type { Response } from "express";
import { stat } from "fs";


export function successResponse(res: Response, data: any, status = 200, message: string = "Success"): void {
    res.status(status).json({
        success: true,
        status,
        message,
        data,
    });
}

export function errorResponse(res: Response, status = 500,  error: string,  message: string , stack: any, ): void {
    res.status(status).json({
        success : false,
        status,
        error,
        message,
        stack
    });
}