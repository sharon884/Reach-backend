import { Request, Response, NextFunction } from "express";
import { z } from "zod";

type ValidationSource = "body" | "query";

export function validationMiddleware(
    schema: z.ZodType,
    source: ValidationSource = "body",
) {
    return function (
        req: Request,
        res: Response,
        next: NextFunction,
    ): void {
        try {
            const parsedData = schema.parse(req[source]);

            res.locals.validatedData = parsedData;

            next();
        } catch (error) {
            next(error);
        }
    };
}