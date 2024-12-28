import {Router } from 'express'
import { forgotPassword, getUser, login, resetPassword, signup } from '../controllers/auth.controller'
import authMiddleware from '../middleware/auth.middleware';
import { errorHandler } from '../utils/error-handler';
import { validateSchema } from '../middleware/validate.middleware';
import { ForgotPasswordRequestSchema, ResetPasswordSchema, UserSigninSchema, UserSignupSchema } from '../schemas/user.schema';

const authrouter:Router = Router()



authrouter.post('/login', validateSchema(UserSigninSchema), errorHandler(login))
authrouter.post('/signup',validateSchema(UserSignupSchema), errorHandler(signup));
authrouter.get('/',[authMiddleware], errorHandler(getUser));
authrouter.post('/forgot-password', validateSchema(ForgotPasswordRequestSchema), errorHandler(forgotPassword));
authrouter.post('/reset-password', validateSchema(ResetPasswordSchema), errorHandler(resetPassword));

export default authrouter