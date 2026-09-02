import {z} from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8,}$/

export const registerUserSchema = z.object({
    email: z.email({message: "El email no es correcto"}),
    password: z.string()
        .min(8, {message: "La contraseña debe tener al menos 8 caracteres"})
        .regex(passwordRegex, {message: "La contraseña debe tener mínimo 1 mayúscula, 1 minúscula, 1 símbolo, 1 número"}),
        
})