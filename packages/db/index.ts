import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export * from "./types";
export default prisma;