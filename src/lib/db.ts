import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export default prisma;

// See docs for optimization later: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections
