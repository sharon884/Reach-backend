import express from "express";

import morgan from "morgan";

import { authRouter } from "@/presentation/auth/routes/auth.routes";

import { adminRouter } from "@/presentation/admin/routes/admin.routes";

import  { catalogRouter } from "./presentation/catalog/routes/catalog.routes.js";

import { errorMiddleware } from "@/presentation/shared/middlewares/error.middleware";

import cookieParser from "cookie-parser";

import cors from "cors";

const app = express();
app.use(morgan("dev"));


app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);



app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/admin/catalog", catalogRouter);
app.use(errorMiddleware);

export default app;