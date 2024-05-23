
import { PrismaClient } from '@prisma/client';
declare global {
    var prisma : PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

// const globalForPrisma = global;
// const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// export default prisma;

// For production..
//export const prisma =  new PrismaClient();