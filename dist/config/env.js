"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.COINMARKETCAP_API_KEY = exports.DATABASE_URL = exports.PORT = void 0;
// src/config/env.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3000;
exports.DATABASE_URL = process.env.DATABASE_URL || "";
exports.COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "";
exports.JWT_SECRET = process.env.JWT_SECRET || "default_secret";
