import { Router } from 'express';

const router = Router();

// Mock startup data storage
let startups: any[] = [
  {
    id: 1,
    name: 'TechVenture',
    industry: 'SaaS',
    stage: 'Seed',
    funding: 500000,
    team: 5,
    createdAt: new Date()
  }
];

router.get('/', (req, res) => {
  res.json({ startups });
});

router.post('/', (req, res) => {
  const startup = {
    id: startups.length + 1,
    ...req.body,
    createdAt: new Date()
  };
  startups.push(startup);
  res.status(201).json(startup);
});

router.get('/:id', (req, res) => {
  const startup = startups.find(s => s.id === parseInt(req.params.id));
  if (!startup) {
    return res.status(404).json({ error: 'Startup not found' });
  }
  res.json(startup);
});

router.put('/:id', (req, res) => {
  const index = startups.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Startup not found' });
  }
  startups[index] = { ...startups[index], ...req.body };
  res.json(startups[index]);
});

router.delete('/:id', (req, res) => {
  const index = startups.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Startup not found' });
  }
  startups.splice(index, 1);
  res.status(204).send();
});

export default router;
