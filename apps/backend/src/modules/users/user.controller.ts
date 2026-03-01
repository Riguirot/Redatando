import { Request, Response } from "express"
import { PrismaStudentRepository } from "./infra/database/PrismaStudentRepository"
import { GetUserByIdUseCase } from "./application/GetUserByIdUseCase"
import { successResponse } from "../shared/http/response"

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params

  const repository = new PrismaStudentRepository()
  const useCase = new GetUserByIdUseCase(repository)

  const result = await useCase.execute(id)

  return successResponse(res, result)
}
