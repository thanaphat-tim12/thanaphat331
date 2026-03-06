const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());  // อนุญาต cross-origin จาก frontend
app.use(express.json());

// Endpoint: Health Check (ตามข้อสอบ)
app.get('/api/health', (req, res) => {
  res.json({ ok: true, status: 'Running smoothly on Render!' });
});

// Endpoint: ดึงข้อมูล Tasks จากฐานข้อมูล (ตามข้อสอบ)
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks from database' });
  }
});

// Endpoint demo (เก็บไว้เฉยๆ)
app.get('/', (req, res) => {
  res.send('Backend is running! Try /api/health or /api/tasks');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(Server running on port ${ PORT });
})