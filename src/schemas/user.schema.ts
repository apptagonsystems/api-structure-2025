import {z} from 'zod';

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

export type User = z.infer<typeof UserSchema>;
export type UserSignup = z.infer<typeof UserSignupSchema>;
export type UserSignin = z.infer<typeof UserSigninSchema>;