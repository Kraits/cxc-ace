import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const databaseUrl = process.env.DATABASE_URL!
  const authToken = process.env.DATABASE_AUTH_TOKEN

  const adapter = new PrismaLibSQL({
    url: databaseUrl,
    authToken: authToken || undefined,
  })

  return new PrismaClient({ adapter } as never)
}

export const db = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
