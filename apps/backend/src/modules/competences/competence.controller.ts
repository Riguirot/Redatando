import { Request, Response } from "express"
import { competenceParamsSchema } from "./competence.schema"
import { getCompetenceById } from "./competence.service"

export const getCompetence = (req: Request, res: Response) => {
  const parsed = competenceParamsSchema.safeParse(req.params)

  if (!parsed.success) {
    return res.status(404).json({
      message: "Competência não encontrada"
    })
  }

  const { id } = parsed.data

  const hasViewedCorrection = true // depois você conecta real

  try {
    const competence = getCompetenceById(id, hasViewedCorrection)
    return res.json(competence)
  } catch (error: any) {
    if (error.message === "FORBIDDEN") {
      return res.status(403).json({
        message:
          "Conteúdo disponível após visualizar sua primeira correção"
      })
    }

    return res.status(500).json({
      message: "Erro interno"
    })
  }
}
