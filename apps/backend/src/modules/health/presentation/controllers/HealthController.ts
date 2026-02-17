import { Request, Response } from "express";
import { successResponse } from "../../../shared/http/response";

export class HealthController {
  static check(req: Request, res: Response) {
    return successResponse(res, {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  }
}
