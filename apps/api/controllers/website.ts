import prisma from "@repo/db/client";
import type { Request, Response } from "express";
import { publishToQueue } from "../services/rabbitmq";
import type { WebsiteMonitoringMessage } from "../types/queue";
import { subHours } from "date-fns";
import { objectAdminMail } from "../utils/objectMailtoAdmin";

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
    if (!url || !name) {
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

    const subject = "Website added on better uptime for monitoring";
    const text = `Hello Rudra A user has added a website for monitoring on better uptime,
User ID: ${website.userId}
User Name: ${session.user.name}
User Email: ${session.user.email}
has added a new website for monitoring on Better Uptime.

Website Details:
- ID: ${website.id}
- Name: ${website.name}
- URL: ${website.url}
- Added At: ${website.timeAdded}`

    objectAdminMail(subject, text);

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
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const token = authHeader.split(" ")[1];
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session) {
      res.status(401).json({ error: "Invalid session" });
      return;
    }

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

    if (website.userId !== session.user.id) {
      res.status(403).json({ error: "You are not authorized to view this website" });
      return;
    }

    const websiteWithLatestTick = {
      ...website,
      latestTick: website.websiteTicks[0] || null,
    };

    res.status(200).json(websiteWithLatestTick);
    return
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const getWebsiteTicks = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const token = authHeader.split(" ")[1];
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session) {
      res.status(401).json({ error: "Invalid session" });
      return;
    }


    const { websiteId } = req.params;
    const hoursParam = req.query.hours ? Number(req.query.hours) : 24;
    const hours = Number.isFinite(hoursParam) && hoursParam > 0 ? hoursParam : 24;
    const from = subHours(new Date(), hours);

    const website = await prisma.website.findUnique({
      where: { id: websiteId },
      select: { id: true,userId: true },
    });

    if (!website) {
      res.status(404).json({ error: "Website not found" });
      return;
    }

    if (website.userId !== session.user.id) {
      res.status(403).json({ error: "You are not authorized to view ticks of this website" });
      return;
    }

    const ticks = await prisma.websiteTick.findMany({
      where: {
        websiteId,
        createdAt: { gte: from },
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
    return
  } catch (error) {
    console.error("Error fetching website ticks:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}

export const editWebsite = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const token = authHeader.split(" ")[1];
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session) {
      res.status(401).json({ error: "Invalid session" });
      return;
    }

    const { websiteId } = req.params;
    const { name, url } = req.body;

    if (!name && !url) {
      res.status(400).json({ error: "At least one of name or url is required to update" });
      return;
    }

    const website = await prisma.website.findUnique({ where: { id: websiteId } });
    if (!website) {
      res.status(404).json({ error: "Website not found" });
      return;
    }

    if (website.userId !== session.user.id) {
      res.status(403).json({ error: "You are not authorized to edit this website" });
      return;
    }

    const urlChanged = url && url !== website.url;

    const updatedWebsite = await prisma.website.update({
      where: { id: websiteId },
      data: {
        ...(name ? { name } : {}),
        ...(url ? { url } : {})
      }
    });

    if (urlChanged) {
      const monitoringMessage: WebsiteMonitoringMessage = {
        websiteId: updatedWebsite.id,
        url: updatedWebsite.url,
        name: updatedWebsite.name,
      };
      await publishToQueue(monitoringMessage);
    }

    res.status(200).json(updatedWebsite);
    return;

  } catch (error:any) {
    console.error("Error editing website :", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
    return;
  }
}

export const deleteWebsite = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const token = authHeader.split(" ")[1];
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session) {
      res.status(401).json({ error: "Invalid session" });
      return;
    }

    const { websiteId } = req.params;

    const website = await prisma.website.findUnique({ where: { id: websiteId } });
    if (!website) {
      res.status(404).json({ error: "Website not found" });
      return;
    }
    if (website.userId !== session.user.id) {
      res.status(403).json({ error: "You are not authorized to delete this website" });
      return;
    }

    await prisma.website.delete({ where: { id: websiteId } });

    res.status(200).json({ message: "Website deleted successfully" });
    return;
  } catch (error:any) {
    console.error("Error deleting website :", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
    return;
  }
}


