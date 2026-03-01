import { Request, Response } from "express"
import { successResponse } from "../shared/http/response"
import { AppError } from "../shared/errors/AppError"
import { GetProgressFocusUseCase } from "./application/GetProgressFocusUseCase"

export const getProgress = async (req: Request, res: Response) => {
  const userId = "mock-user-id"

  if (!userId) {
    throw new AppError("Unauthorized", 401, "UNAUTHORIZED")
  }

  const useCase = new GetProgressFocusUseCase()
  const result = useCase.execute(userId)

  return successResponse(res, result)
}
