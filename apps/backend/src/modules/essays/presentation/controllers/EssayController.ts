import { Request, Response, NextFunction } from 'express'
import { SubmitEssayUseCase } from '../../application/useCases/SubmitEssayUseCase'
import { GetEssayByIdUseCase } from '../../application/useCases/GetEssayByIdUseCase'

export class EssayController {
  constructor(
    private readonly submitEssayUseCase: SubmitEssayUseCase,
    private readonly getEssayByIdUseCase: GetEssayByIdUseCase
  ) {}

  async submit(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const user = req.user
      const { theme } = req.body
      const uploadedFile = req.file

      if (!user) {
        return res.status(401).json({
          success: false,
          data: null,
          error: {
            message: 'Unauthenticated',
            code: 'UNAUTHENTICATED',
          },
        })
      }

      if (!uploadedFile) {
        return res.status(400).json({
          success: false,
          data: null,
          error: {
            message: 'Arquivo da redação é obrigatório',
            code: 'FILE_REQUIRED',
          },
        })
      }

      const result = await this.submitEssayUseCase.execute({
        studentId: user.id,
        theme,
        file: uploadedFile.buffer,
      })

      return res.status(201).json({
        success: true,
        data: result,
        error: null,
      })
    } catch (error) {
      next(error)
    }
  }

  async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const essayId = req.params.id
      const studentId = req.user.id

      const result = await this.getEssayByIdUseCase.execute({
        essayId,
        studentId,
      })

      return res.status(200).json({
        success: true,
        data: result,
        error: null,
      })
    } catch (error) {
      next(error)
    }
  }
}
