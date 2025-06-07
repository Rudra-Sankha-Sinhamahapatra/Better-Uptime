// apps/web/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma  from "@repo/db/client";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile: (profile: any) => ({
        id: profile.sub,  
        email: profile.email,
        name: profile.name,
        image: profile.picture,
      }),
    },
  },
  plugins: [nextCookies()],
});