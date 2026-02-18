import { Router } from 'express';

const router = Router();

router.post('/match', (req, res) => {
  const { skills, experience, industry } = req.body;
  
  const matches = [
    {
      id: 1,
      name: 'Alex Chen',
      role: 'Technical Co-Founder',
      skills: ['Full-Stack Development', 'AI/ML', 'Cloud Architecture'],
      experience: '8 years',
      industry: 'SaaS',
      matchScore: 92,
      bio: 'Former tech lead at major tech company, passionate about building scalable solutions'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'Business Co-Founder',
      skills: ['Marketing', 'Sales', 'Business Development'],
      experience: '10 years',
      industry: 'B2B SaaS',
      matchScore: 88,
      bio: 'Ex-VP of Sales with proven track record in scaling startups'
    },
    {
      id: 3,
      name: 'Michael Rodriguez',
      role: 'Product Co-Founder',
      skills: ['Product Management', 'UX Design', 'Data Analytics'],
      experience: '6 years',
      industry: 'FinTech',
      matchScore: 85,
      bio: 'Product leader with experience launching successful products'
    }
  ];
  
  res.json({ matches });
});

router.get('/personas', (req, res) => {
  res.json({
    personas: [
      { type: 'Technical', description: 'CTO/Engineering lead', demand: 'High' },
      { type: 'Business', description: 'CEO/Business development', demand: 'High' },
      { type: 'Product', description: 'CPO/Product manager', demand: 'Medium' },
      { type: 'Marketing', description: 'CMO/Growth hacker', demand: 'Medium' }
    ]
  });
});

export default router;
