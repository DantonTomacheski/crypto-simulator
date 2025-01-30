import rateLimit from "express-rate-limit";

// Limitar tentativas de login a 5 por IP a cada 15 minutos
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Muitas tentativas de login. Tente novamente mais tarde." },
});

export { loginLimiter };
