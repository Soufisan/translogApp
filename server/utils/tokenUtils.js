import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

export const generateTokenConfirm = (id) => {
    const payload = {user_id: id }
    const token = jwt.sign(payload, process.env.SECRET_KEY)
    return token;
}

export const generateTokenLogin = (id) => {
    const payload = {user_id: id }
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "7d"})
    return token;
}