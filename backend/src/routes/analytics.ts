import { Router } from 'express';

const router = Router();

router.get('/overview', (req, res) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  
  res.json({
    revenue: months.map((month, i) => ({ month, value: 10000 + i * 5000 })),
    users: months.map((month, i) => ({ month, value: 100 + i * 50 })),
    growth: {
      revenueGrowth: '+45%',
      userGrowth: '+38%',
      churnRate: '2.5%'
    }
  });
});

router.get('/metrics', (req, res) => {
  res.json({
    mrr: 45000,
    arr: 540000,
    ltv: 12000,
    cac: 800,
    ltvCacRatio: 15,
    activeUsers: 1250,
    churnRate: 2.5
  });
});

export default router;
