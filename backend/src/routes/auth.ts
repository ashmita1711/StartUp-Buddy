import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

// Mock user storage (replace with database)
const users: any[] = [];

// User data storage - stores user-specific startup data
export const userData: Record<string, {
  userId: string;
  email: string;
  name: string;
  startupIdea?: {
    category: string;
    budget: string;
    experience: string;
    idea: string;
    analyzedAt: string;
  };
  analysisResults?: any;
  chatHistory: Array<{ message: string; response: string; timestamp: string }>;
}> = {};

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), email, name, password: hashedPassword };
  users.push(user);

  // Initialize user data storage
  userData[user.id] = {
    userId: user.id,
    email: user.email,
    name: user.name,
    chatHistory: []
  };

  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email, name } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Initialize user data if not exists
  if (!userData[user.id]) {
    userData[user.id] = {
      userId: user.id,
      email: user.email,
      name: user.name,
      chatHistory: []
    };
  }

  const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

export default router;
