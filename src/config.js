import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT;
export const MORNGO_URL = process.env.MORNGO_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
