import { Router } from "express"
import { getProgress } from "./progress.controller"

const router = Router()

router.get("/me/progress-focus", getProgress)

export default router
