import { z } from 'zod'

export const signinSchema = z.object({
    username: z.string("Invalid username address"),
    password: z.string().min('6', 'Invalid password')
});