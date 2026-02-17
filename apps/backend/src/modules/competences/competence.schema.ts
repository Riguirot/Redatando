import { z } from "zod"

export const competenceParamsSchema = z.object({
  id: z.enum(["C1", "C2", "C3", "C4", "C5"])
})

export type CompetenceParams = z.infer<typeof competenceParamsSchema>
