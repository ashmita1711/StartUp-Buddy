import { Router } from 'express';

const router = Router();

router.post('/assess', (req, res) => {
  const { industry, stage, teamSize, funding } = req.body;
  
  // Calculate risk scores based on inputs
  const marketRisk: 'Low' | 'Medium' | 'High' = industry === 'SaaS' ? 'Low' : 'Medium';
  const financialRisk: 'Low' | 'Medium' | 'High' = funding > 500000 ? 'Low' : funding > 100000 ? 'Medium' : 'High';
  const teamRisk: 'Low' | 'Medium' | 'High' = teamSize >= 5 ? 'Low' : teamSize >= 3 ? 'Medium' : 'High';
  
  const getRiskScore = (level: 'Low' | 'Medium' | 'High'): number => {
    return level === 'Low' ? 3 : level === 'Medium' ? 6 : 9;
  };
  
  const risks = [
    { 
      category: 'Market', 
      level: marketRisk, 
      description: 'Competitive landscape is evolving',
      score: getRiskScore(marketRisk),
      mitigation: 'Conduct regular competitor analysis and market research'
    },
    { 
      category: 'Financial', 
      level: financialRisk, 
      description: funding > 500000 ? 'Adequate runway for next 12 months' : 'Limited runway, consider fundraising',
      score: getRiskScore(financialRisk),
      mitigation: 'Maintain 12+ months runway, diversify revenue streams'
    },
    { 
      category: 'Team', 
      level: teamRisk, 
      description: teamSize >= 5 ? 'Well-staffed team' : 'Consider expanding team',
      score: getRiskScore(teamRisk),
      mitigation: 'Hire key roles, build advisory board'
    },
    {
      category: 'Technology',
      level: 'Medium' as const,
      description: 'Technical debt and scalability concerns',
      score: 5,
      mitigation: 'Regular code reviews, invest in infrastructure'
    },
    {
      category: 'Legal',
      level: 'Low' as const,
      description: 'Standard compliance requirements',
      score: 3,
      mitigation: 'Consult with legal counsel, maintain proper documentation'
    }
  ];
  
  const overallScore = risks.reduce((sum, r) => sum + r.score, 0) / risks.length;
  
  res.json({ 
    risks, 
    overallScore: parseFloat(overallScore.toFixed(1)),
    riskLevel: overallScore < 4 ? 'Low' : overallScore < 7 ? 'Medium' : 'High',
    timestamp: new Date().toISOString()
  });
});

router.get('/categories', (req, res) => {
  res.json({
    categories: [
      { name: 'Market Risk', description: 'Competition and market dynamics' },
      { name: 'Financial Risk', description: 'Cash flow and funding' },
      { name: 'Team Risk', description: 'Human resources and talent' },
      { name: 'Technology Risk', description: 'Technical challenges and debt' },
      { name: 'Legal Risk', description: 'Compliance and regulations' }
    ]
  });
});

export default router;
