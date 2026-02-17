import { Request, Response } from "express"
import { getProgressFocus } from "./progress.service"

export const getProgress = async (req: Request, res: Response) => {
  // 🚨 Temporário
  const userId = "mock-user-id"

  const focus = await getProgressFocus(userId)

  return res.json(focus)
}
