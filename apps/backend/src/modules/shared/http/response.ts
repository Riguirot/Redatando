import { Response } from "express";

interface ErrorPayload {
  message: string;
  code?: string;
}

export function successResponse<T>(
  res: Response,
  data: T,
  statusCode = 200
) {
  return res.status(statusCode).json({
    success: true,
    data,
    error: null
  });
}

export function errorResponse(
  res: Response,
  error: ErrorPayload,
  statusCode = 400
) {
  return res.status(statusCode).json({
    success: false,
    data: null,
    error
  });
}
