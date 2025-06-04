import type { Request, Response } from "express";
import { getQueueStatus } from "../services/rabbitmq";

export const queueHealth = async (req:Request,res:Response) => {
   try {
      const status = await getQueueStatus();
      res.status(200).json({
        status: "healthy",
        timestamp: new Date().toISOString(),
        queue: status
      })
   } catch (error:any) {
       res.status(500).json({
        status: "unhealthy",
        error: error.message
       })
   }
}