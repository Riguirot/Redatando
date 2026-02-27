import { Request, Response } from "express"
import { makeGetDashboardUseCase } from "../../../application/useCase/factories/makeGetDashboardUseCase"

export class GetDashboardController {
  async handle(req: Request, res: Response) {

    try {
      const studentId =
        req.query.studentId as string

      if (!studentId) {
        return res.status(400).json({
          error: "studentId is required"
        })
      }

      const useCase = makeGetDashboardUseCase()

      const data = await useCase.execute({ studentId })

      return res.json(data)

    } catch (error) {
      console.error(error)

      return res.status(500).json({
        error: "Internal server error"
      })
    }
  }
}