import { Request, Response, NextFunction } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { SubmitEssayDTO } from "../../dtos/SubmitEssayDTO";

export function validateCreateContent(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body as Partial<SubmitEssayDTO>;

  if (!body.studentId || typeof body.studentId !== "string") {
    throw new AppError("Student ID is required", 400, "VALIDATION_ERROR");
  }

  if (!body.theme || typeof body.theme !== "string") {
    throw new AppError("Theme is required", 400, "VALIDATION_ERROR");
  }

  if (!body.file) {
    throw new AppError("File is required", 400, "VALIDATION_ERROR");
  }

  next();
}
