import {Router } from 'express'
import { getUser, login, signup } from '../controllers/auth.controller'
import authMiddleware from '../middleware/auth.middleware';
import { errorHandler } from '../utils/error-handler';
import { validateSchema } from '../middleware/validate.middleware';
import { UserSigninSchema, UserSignupSchema } from '../schemas/user.schema';

const authrouter:Router = Router()



authrouter.post('/login', validateSchema(UserSigninSchema), errorHandler(login))
authrouter.post('/signup',validateSchema(UserSignupSchema), errorHandler(signup));
authrouter.get('/',[authMiddleware], errorHandler(getUser));

export default authrouter