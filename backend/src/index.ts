import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import mentorRoutes from './routes/mentor';
import financialRoutes from './routes/financial';
import riskRoutes from './routes/risk';
import competitorRoutes from './routes/competitor';
import cofounderRoutes from './routes/cofounder';
import analyticsRoutes from './routes/analytics';
import startupRoutes from './routes/startup';
import ideasRoutes from './routes/ideas';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   Health: GET /api/health`);
  console.log(`   Auth: POST /api/auth/register, /api/auth/login`);
  console.log(`   Dashboard: GET /api/dashboard/metrics`);
  console.log(`   Mentor: POST /api/mentor/chat`);
  console.log(`   Financial: POST /api/financial/runway`);
  console.log(`   Risk: POST /api/risk/assess`);
  console.log(`   Competitor: POST /api/competitor/analyze`);
  console.log(`   Co-Founder: POST /api/cofounder/match`);
  console.log(`   Analytics: GET /api/analytics/overview`);
  console.log(`   Startups: GET /api/startups`);
});
