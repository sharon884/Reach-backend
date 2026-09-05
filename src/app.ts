import express from "express";
import { authRouter } from "./presentation/routes/auth/auth.routes.js";
import { adminRouter } from "./presentation/routes/admin/admin.routes.js";
import { errorMiddleware } from "./presentation/middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use(errorMiddleware);

export default app;