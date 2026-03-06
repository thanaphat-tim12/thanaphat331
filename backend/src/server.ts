// src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import taskRoutes from './routes/task.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// === logs dir (ต่อยอดจาก Lab 1.2) ===
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// ✅ 1. เพิ่ม Health Check Endpoint ตามโจทย์ (20 คะแนน)
app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// 2. Demo endpoint เดิม
app.get('/api/demo', (req, res) => {
  const logMessage = `Request at ${new Date().toISOString()}: ${req.ip}\n`;
  fs.appendFileSync(path.join(logsDir, 'access.log'), logMessage);

  res.json({
    git: {
      title: 'Advanced Git Workflow',
      detail: 'ใช้ branch protection บน GitHub, code review ใน PR, และ squash merge',
    },
    docker: {
      title: 'Advanced Docker',
      detail: 'ใช้ multi-stage build, healthcheck ใน Dockerfile',
    },
  });
});

// 3. Root path
app.get('/', (_req, res) => {
  res.json({
    message: 'API พร้อมใช้งาน (Supabase + Prisma + Quasar Frontend)',
    timestamp: new Date().toISOString(),
  });
});

// ✅ 4. Task API (ดึงข้อมูลจาก Database จริง)
app.use('/api/tasks', taskRoutes);

// ✅ 5. fallback 404 สำหรับทุก route ที่ไม่ match
app.use((req, res) => {
  res.status(404).json({
    message: 'ไม่พบเส้นทาง',
    path: req.originalUrl,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
