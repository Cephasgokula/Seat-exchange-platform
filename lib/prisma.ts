import { PrismaClient } from '@prisma/client'

declare global {
  // This prevents Next.js from creating multiple instances of PrismaClient during development
  var prisma: PrismaClient | undefined
}

export const prisma = globalThis.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma