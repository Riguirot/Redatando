import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { CreateContentDTO } from "../../dtos/SubmitEssayDTO";

export function validateCreateContent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body as Partial<CreateContentDTO>;

  if (!body.title || typeof body.title !== "string") {
    throw new AppError("Title is required", 400, "VALIDATION_ERROR");
  }

  if (!body.text || typeof body.text !== "string") {
    throw new AppError("Text is required", 400, "VALIDATION_ERROR");
  }

  next();
}
