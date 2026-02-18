import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../src/routes/auth';
import dashboardRoutes from '../src/routes/dashboard';
import mentorRoutes from '../src/routes/mentor';
import financialRoutes from '../src/routes/financial';
import riskRoutes from '../src/routes/risk';
import competitorRoutes from '../src/routes/competitor';
import cofounderRoutes from '../src/routes/cofounder';
import analyticsRoutes from '../src/routes/analytics';
import startupRoutes from '../src/routes/startup';
import ideasRoutes from '../src/routes/ideas';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Welcome to StartUp-Buddy API',
    version: '2.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/register, /api/auth/login',
      dashboard: '/api/dashboard/analyze, /api/dashboard/metrics',
      mentor: '/api/mentor/chat, /api/mentor/suggestions',
      ideas: '/api/ideas/generate',
      financial: '/api/financial/runway',
      risk: '/api/risk/assess',
      competitor: '/api/competitor/analyze',
      cofounder: '/api/cofounder/match',
      analytics: '/api/analytics/overview',
      startups: '/api/startups'
    },
    documentation: 'See API.md for full documentation'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/mentor', mentorRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/risk', riskRoutes);
app.use('/api/competitor', competitorRoutes);
app.use('/api/cofounder', cofounderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/startups', startupRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'StartUp-Buddy API is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
