import { Request , Response, NextFunction  } from "express";
import { z } from "zod";


export function validationMiddleware ( schema : z.ZodType ) {
        
     return function ( req : Request, res : Response, next : NextFunction ) {
           try {
                schema.parse(req.body);
                next();
           }catch (error) {
                 next(error)
           } 
     }
}