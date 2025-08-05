import dotenv from "dotenv";
dotenv.config();

process.env.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/";
process.env.DATABASE_NAME = process.env.DATABASE_NAME || "test";
process.env.NODE_ENV = process.env.NODE_ENV || "development";
process.env.PORT = process.env.PORT || 3000;
process.env.SESSION_SECRET = process.env.SESSION_SECRET || "mern";
process.env.ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || "http://localhost:5173,http://localhost"
