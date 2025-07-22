import prisma from "@repo/db/client";
import type { Request, Response } from "express";
import { publishToQueue } from "../services/rabbitmq";

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, queryType, query } = req.body;

    // Validate required fields
    if (!name || !email || !queryType || !query) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ error: "Invalid email format" });
      return;
    }

    let userSession = null;
    
    // Check if user is logged in
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const session = await prisma.session.findUnique({
          where: { token },
          include: { user: true }
        });

        if (session) {
          userSession = {
            id: session.user.id,
            name: session.user.name || name,
            email: session.user.email || email
          };
        }
      } catch (error) {
        // If session validation fails, continue as anonymous user
        console.log("Session validation failed, treating as anonymous user");
      }
    }

    // Create contact form message for queue
    const contactMessage = {
      type: 'contact_form' as const,
      data: {
        name, // Form submitted name
        email, // Form submitted email
        queryType,
        query,
        isLoggedIn: !!userSession,
        userId: userSession?.id || null,
        originalName: userSession?.name || null, // Original account name
        originalEmail: userSession?.email || null, // Original account email
        submittedAt: new Date().toISOString()
      }
    };

    // Send to queue for email processing
    await publishToQueue(contactMessage);

    console.log("Contact form submitted:", {
      name: contactMessage.data.name,
      email: contactMessage.data.email,
      queryType,
      isLoggedIn: !!userSession
    });

    res.status(200).json({ 
      message: "Contact form submitted successfully",
      submitted: true
    });
    return;

  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
}; 