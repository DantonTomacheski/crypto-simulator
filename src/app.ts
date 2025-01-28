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

export default app;
