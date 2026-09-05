import express from "express";
import { authRouter } from "./presentation/routes/auth/auth.routes.js";
import { adminRouter } from "./presentation/routes/admin/admin.routes.js";
import { errorMiddleware } from "./presentation/middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use(errorMiddleware);

export default app;