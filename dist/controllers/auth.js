"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authService_1 = require("../services/authService");
const authController = {
    register: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await authService_1.authService.register(email, password);
            res.status(201).json({ message: "Usuário criado com sucesso", user });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Registration failed";
            res.status(400).json({ error: message });
        }
    },
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const { token, user } = await authService_1.authService.login(email, password);
            res.json({ message: "Login bem-sucedido", token });
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Login failed";
            res.status(401).json({ error: message });
        }
    },
};
exports.default = authController;
