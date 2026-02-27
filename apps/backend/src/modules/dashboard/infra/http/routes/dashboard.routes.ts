import { Router } from "express"
import { GetDashboardController } from "../controllers/GetDashboardController"

const dashboardRoutes = Router()
const controller = new GetDashboardController()

dashboardRoutes.get("/dashboard", controller.handle)

export { dashboardRoutes }