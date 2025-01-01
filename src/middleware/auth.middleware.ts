import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/exceptions";
import JWTHelper from "../utils/jwt-utils";
import { prisma } from "../utils/prisma";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // extract token from header
    const token = req.headers.authorization?.split(" ")[1];
    // check if token exists
    if (!token) {
      return next(new UnauthorizedException("Unauthorized"));
    }
    // if toekn exists, verify it and extract payload
    const payload: { id: string } = JWTHelper.verifyToken(token) as any;
    const user = await prisma.user.findFirst({ where: { id: payload.id } });
    if (!user) {
      return next(new UnauthorizedException("Unauthorized"));
    }
    // get the user from payload && add user to request object
    req.user = user;

    // Log authentication
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "AUTHENTICATION",
        details: `User authenticated with data`,
      },
    });

    next();
  } catch (error: any) {
    next(new UnauthorizedException("Unauthorized"));
  }
};
export default authMiddleware;
