"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Erro: ${err.message}`);
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode).json({
        error: err.message || "Erro interno no servidor",
    });
};
exports.errorHandler = errorHandler;
