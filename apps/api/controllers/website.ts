import prisma from "@repo/db/client";
import type { Request, Response } from "express";
import { publishToQueue } from "../services/rabbitmq";
import type { WebsiteMonitoringMessage } from "../types/queue";

export const allWebsites = async (req: Request, res: Response) => {
    try {
      const websites = await prisma.website.findMany({
        include: {
          websiteTicks: {
            orderBy: {
              createdAt: 'desc'
            },
            take: 1,
          }
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