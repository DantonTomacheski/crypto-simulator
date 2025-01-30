import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
export const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
