import { z } from 'zod'

export const signinSchema = z.object({
    username: z.string().email("Invalid email address"),
    password: z.string().min('6', 'Invalid password')
});