import { Router } from 'express';

const router = Router();

router.post('/runway', (req, res) => {
  const { currentCash, monthlyBurn, monthlyRevenue } = req.body;
  
  const netBurn = monthlyBurn - monthlyRevenue;
  const runway = netBurn > 0 ? currentCash / netBurn : Infinity;
  
  res.json({
    runway: runway === Infinity ? 'Infinite' : parseFloat(runway.toFixed(1)),
    netBurn,
    currentCash,
    monthlyBurn,
    monthlyRevenue,
    projectedDepletion: runway === Infinity ? null : new Date(Date.now() + runway * 30 * 24 * 60 * 60 * 1000),
    status: runway > 12 ? 'Healthy' : runway > 6 ? 'Moderate' : 'Critical'
  });
});

router.post('/forecast', (req, res) => {
  const { currentCash, monthlyBurn, monthlyRevenue, growthRate } = req.body;
  
  const months = [];
  let cash = currentCash;
  let revenue = monthlyRevenue;
  
  for (let i = 0; i < 12; i++) {
    cash = cash + revenue - monthlyBurn;
    revenue = revenue * (1 + (growthRate || 0.05));
    
    months.push({
      month: i + 1,
      cash: Math.round(cash),
      revenue: Math.round(revenue),
      burn: monthlyBurn
    });
    
    if (cash <= 0) break;
  }
  
  res.json({ forecast: months });
});

router.get('/metrics', (req, res) => {
  res.json({
    metrics: {
      grossMargin: 75,
      netMargin: 15,
      operatingExpenses: 45000,
      cogs: 12000,
      cashFlow: 8000
    }
  });
});

export default router;
