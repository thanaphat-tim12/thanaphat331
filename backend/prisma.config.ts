import { defineConfig } from '@prisma/config';
import 'dotenv/config';

export default defineConfig({
    schema: 'prisma/schema.prisma',
    datasource: {
        url: process.env.DATABASE_URL
    },
    migrations: {
        // เปลี่ยนจาก 'node prisma/seed.js' เป็น 'ts-node prisma/seed.ts'
        seed: 'ts-node prisma/seed.ts'
    }
});