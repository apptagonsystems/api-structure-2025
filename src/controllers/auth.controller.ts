import {Request, Response, NextFunction} from 'express';
import * as jwt from 'jsonwebtoken';
import { ForgotPasswordRequestSchema, ResetPasswordSchema, UserSigninSchema, UserSignupSchema } from '../schemas/user.schema';
import {prisma } from "../utils/prisma";
import { BadRequestException, InvalidInputException, NotFoundException, UnprocessableEntityException } from '../exceptions/exceptions';
import { JWT_SECRET } from '../utils/secrets';
import PasswordHelper from '../utils/passwordHelper';
import { successResponse } from '../utils/responses';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    const data =  UserSigninSchema.parse(req.body);

    const {email, password} = data;
        
    if (!email || !password ) {
        return  next(new InvalidInputException('Please provide email and password'))
        
    }

    // check if user already exists
    let user = await prisma.user.findUnique({where: {email}});

    if (!user) {
      return  next(new  NotFoundException('User does not exist'))
    }

    if(!PasswordHelper.comparePassword(password, user!.password)) {
       return next( new BadRequestException('Invalid credentials'))
    }

    const token = jwt.sign({id: user!.id}, JWT_SECRET!, {expiresIn: '1d'});

    successResponse(res, {user, token}, 201, 'User logged in successfully');
}

export const signup = async  (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
       const data =  UserSignupSchema.parse(req.body);

        const {email, password, name} = data;
        
        if (!email || !password || !name) {
            return next(new BadRequestException('Please provide email, password and name'))
        }

        // check if user already exists
        let user = await prisma.user.findUnique({where: {email}});
        if (user) {
            return    next(new BadRequestException('User already exists'))
        }

        user = await prisma.user.create({
            data: {
                email,
                password: await PasswordHelper.hashPassword(password),
                name
            }
        });

        successResponse(res, user, 201, 'User created successfully');
    } catch (error: any) {
        next(new UnprocessableEntityException(error?.issues)) 
    }
}

export const getUser = async  (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        //   const userData =  req.user 
        // check if user already exists
        let user = await prisma.user.findUnique({where: {id: req.user?.id}});
        
        res.status(201).send(user);

        successResponse(res, user, 201, 'User fetched successfully');
    } catch (error: any) {
        next(new UnprocessableEntityException(error?.issues)) 
    }
}

export const resetPassword = async  (req: Request, res: Response, next: NextFunction): Promise<void> => {    
    try {
        const data =  ResetPasswordSchema.parse(req.body);

        const {oldPassword, newPassword} = data;
        if (!oldPassword || !newPassword) {
            return next(new BadRequestException('Please provide old password and new password'))
        }

        // check if user already exists
        let user = await prisma.user.findUnique({where: {id: req.user?.id}});
        if (!user) {
            return next(new NotFoundException('User does not exist'))
        }

        if(!PasswordHelper.comparePassword(oldPassword, user!.password)) {
            return next( new BadRequestException('Invalid credentials'))
        }

        user = await prisma.user.update({
            where: {id: req.user?.id},
            data: {
                password: await PasswordHelper.hashPassword(newPassword)
            }
        });

        successResponse(res, user, 201, 'Password reset successfully');
    } catch (error: any) {
        next(new UnprocessableEntityException(error?.issues)) 
    }
}

export const forgotPassword = async  (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data =  ForgotPasswordRequestSchema.parse(req.body);

        const {email} = data;
        if (!email) {
            return next(new BadRequestException('Please provide email'))
        }

        // check if user already exists
        let user = await prisma.user.findUnique({where: {email}});
        if (!user) {
            return next(new NotFoundException('User does not exist'))
        }

        // send email to user with otp
        // TODO: Implement email sending logic here

        successResponse(res, {}, 201, 'Password reset link sent to email');
    } catch (error: any) {
        next(new UnprocessableEntityException(error?.issues)) 
    }
}