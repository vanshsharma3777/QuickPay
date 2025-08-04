import { z } from 'zod'

export const signupSchema = z.object({
    username: z.string("Invalid useranme address"),
    lastName: z.string().min(2, 'Last name is required'),
    firstName: z.string().min(2, 'First name is required'),
    password: z.string().min('6', 'Password should atleast be contain 6 characters')
});