import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { errorResponse } from "../utils/response";

export const validateRequest = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMessage = result.error.issues[0].message;
      return errorResponse(res, errorMessage, 400);
    }

    req.body = result.data;
    next();
  };
};