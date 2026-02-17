import { Router } from "express"
import { getCompetence } from "./competence.controller"

const router = Router()

router.get("/:id", getCompetence)

export default router
