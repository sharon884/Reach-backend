import express from "express";
import { authRouter } from "./presentation/routes/auth/auth.routes.js";
import { adminRouter } from "./presentation/routes/admin/admin.routes.js";
import { errorMiddleware } from "./presentation/middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


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
app.use(errorMiddleware);

export default app;