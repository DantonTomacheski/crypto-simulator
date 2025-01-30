import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

// Inicia o servidor apenas se não for importado como módulo
if (require.main === module) {
  const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

export default app;
