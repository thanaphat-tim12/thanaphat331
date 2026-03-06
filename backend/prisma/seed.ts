import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ 
    connectionString,
    ssl: { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);

// บังคับให้ใช้ DATABASE_URL จาก .env โดยตรง
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('Start seeding...');

    // ลบข้อมูลเก่าก่อน (แนะนำ)
    await prisma.task.deleteMany();

    const initialTasks = [
        { title: 'Setup Project', description: 'Initial project structure with Express and Quasar' },
        { title: 'Database Migration', description: 'Connect to Supabase and push Prisma schema' },
        { title: 'Cloud Deployment', description: 'Deploy Backend to Render and Frontend to Netlify' },
        { title: 'ธนภัทร ตาสาย 6604101331', description: 'Fullstack Lab: Express + Prisma + Supabase' },
    ];

    for (const t of initialTasks) {
        const task = await prisma.task.create({ data: t });
        console.log(`Created task with id: ${task.id}`);
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => { await prisma.$disconnect(); })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });