import prisma from "@repo/db/client";
import type { Request, Response } from "express";
import { publishToQueue } from "../services/rabbitmq";
import type { WebsiteMonitoringMessage } from "../types/queue";
import { subHours } from "date-fns";

export const allWebsites = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
          res.status(401).json({ error: "Unauthorized" });
          return;
      }

      const token = authHeader.split(' ')[1];
      const session = await prisma.session.findUnique({
          where: { token },
          include: { user: true }
      });

      if (!session) {
          res.status(401).json({ error: "Invalid session" });
          return;
      }
      const websites = await prisma.website.findMany({
        include: {
          websiteTicks: {
            orderBy: {
              createdAt: 'desc'
            },
            take: 1,
          }
        },
        where: {
          userId: session.user.id
        }
      });

      const websitesWithLatestTick = websites.map(website => ({
        ...website,
        latestTick: website.websiteTicks[0] || null
      }));

      res.status(200).json(websitesWithLatestTick);
      return;
    } catch (error) {
      console.error('Error fetching websites:', error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  };

  export const createWebsite = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
          res.status(401).json({ error: "Unauthorized" });
          return;
      }

      const token = authHeader.split(' ')[1];
      const session = await prisma.session.findUnique({
          where: { token },
          include: { user: true }
      });

      if (!session) {
          res.status(401).json({ error: "Invalid session" });
          return;
      }
    const { name, url } = req.body; 
    if(!url || !name) {
    res.status(400).json({ error: "Name and url are required" });
    return;
    }  
  
    const website = await prisma.website.create({
      data: { 
          name,
          url,
          timeAdded: new Date(),
          userId: session.user.id
       },
    });

    const monitoringMessage: WebsiteMonitoringMessage = {
      websiteId: website.id,
      url: website.url,
      name: website.name
  };

   await publishToQueue(monitoringMessage);

    res.status(200).json(website);
    return;
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
  };

  export const getWebsiteById = async (req: Request, res: Response) => {
    try {
      const { websiteId } = req.params;
      const website = await prisma.website.findUnique({
        where: { id: websiteId },
        include: {
          websiteTicks: {
            orderBy: {
              createdAt: 'desc'
            },
            take: 1,
          }
        }
      });

      if (!website) {
        res.status(404).json({ error: "Website not found" });
        return;
      } 

      const websiteWithLatestTick = {
        ...website,
        latestTick: website.websiteTicks[0] || null,
      };
      
      res.status(200).json(websiteWithLatestTick);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  };

  export const getWebsiteTicks = async (req:Request,res:Response) => {
    try {
      const { websiteId } = req.params;
      const hoursParam = req.query.hours ? Number(req.query.hours) : 24;
      const hours = Number.isFinite(hoursParam) && hoursParam > 0 ? hoursParam : 24;
      const from = subHours(new Date(), hours);

      const website = await prisma.website.findUnique({
        where: { id: websiteId },
        select: { id: true },
      });

      if(!website) {
        res.status(404).json({ error: "Website not found" });
        return;
      }

      const ticks = await prisma.websiteTick.findMany({
        where: {
          websiteId,
          createdAt: {gte: from},
        },
        orderBy: { createdAt: "asc" },
        select: {
          id: true,
          response_time_ms: true,
          status: true,
          createdAt: true,
          regionId: true,
        },
      });

      res.status(200).json({
        websiteId,
        rangeHours: hours,
        count: ticks.length,
        ticks
      });

    } catch (error) {
      console.error("Error fetching website ticks:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
  }