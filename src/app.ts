import express from "express";
import { authRouter } from "./presentation/routes/auth/auth.routes.js";
import { errorMiddleware } from "./presentation/middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use(errorMiddleware);

export default app;