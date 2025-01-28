import { Request, Response, NextFunction } from "express";
import { authService } from "../services/authService";

const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await authService.register(email, password);
      res.status(201).json({ message: "Usuário criado com sucesso", user });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Registration failed";
      res.status(400).json({ error: message });
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { token, user } = await authService.login(email, password);
      res.json({ message: "Login bem-sucedido", token });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      res.status(401).json({ error: message });
    }
  },
};

export default authController;
