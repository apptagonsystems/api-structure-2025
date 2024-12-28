import {z} from 'zod';
import UtitlitiesHelper from '../utils/utilitiesHelper';

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const UserSignupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
})

export const UserSigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})


export const ForgotPasswordRequestSchema = z.object({
  email: z.string().email()
});

export const ResetPasswordSchema = z.object({
  token: z.string().min(1),
  oldPassword: z.string().min(6),
  newPassword: z.string().min(8).refine(
    (password) => UtitlitiesHelper.isPasswordStrong(password),
    {
      message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }
  )
});

export type User = z.infer<typeof UserSchema>;
export type UserSignup = z.infer<typeof UserSignupSchema>;
export type UserSignin = z.infer<typeof UserSigninSchema>;