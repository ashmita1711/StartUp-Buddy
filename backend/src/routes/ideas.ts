import { Router } from 'express';
import { getChatResponse } from '../services/gemini';
import { authenticate } from '../middleware/auth';

const router = Router();

// Generate fresh startup ideas for a category using AI
router.post('/generate', authenticate, async (req, res) => {
  try {
    const { category } = req.body;
    
    const prompt = `Generate 3 unique, innovative startup ideas for the ${category} category. 
    
For each idea provide:
- Title (creative and catchy)
- Description (2-3 sentences explaining the concept)
- Difficulty level (Beginner/Intermediate/Advanced)
- Investment range in Indian Rupees
- Market size (Small/Medium/Large/Growing)

Make these ideas fresh, specific, and actionable. Focus on current market trends and gaps.
Format as JSON array:
[{
  "title": "...",
  "description": "...",
  "difficulty": "...",
  "investment": "₹...",
  "marketSize": "..."
}]`;

    const aiResponse = await getChatResponse(prompt);
    
    // Try to parse JSON response
    let ideas;
    try {
      const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        ideas = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON array found');
      }
    } catch {
      // Fallback to curated ideas
      ideas = generateCuratedIdeas(category);
    }
    
    res.json({
      success: true,
      category,
      ideas,
      generatedAt: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Ideas generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate ideas',
      message: error.message
    });
  }
});

function generateCuratedIdeas(category: string) {
  const ideasMap: Record<string, any[]> = {
    tech: [
      {
        title: 'AI-Powered Personal Finance Assistant',
        description: 'Smart budgeting app that uses AI to analyze spending patterns and provide personalized financial advice. Integrates with bank accounts for real-time insights.',
        difficulty: 'Intermediate',
        investment: '₹3-6L',
        marketSize: 'Large'
      },
      {
        title: 'Remote Work Productivity Suite',
        description: 'All-in-one platform for remote teams with time tracking, focus modes, and AI-powered productivity insights. Helps distributed teams stay connected and efficient.',
        difficulty: 'Advanced',
        investment: '₹5-10L',
        marketSize: 'Growing'
      },
      {
        title: 'Local Language Learning Platform',
        description: 'Interactive platform teaching Indian regional languages through gamification and AI speech recognition. Preserves cultural heritage while making learning fun.',
        difficulty: 'Intermediate',
        investment: '₹2-5L',
        marketSize: 'Medium'
      }
    ],
    saas: [
      {
        title: 'Restaurant Management Cloud',
        description: 'Complete SaaS solution for restaurants with inventory management, online ordering, table reservations, and analytics. Helps small restaurants compete with chains.',
        difficulty: 'Intermediate',
        investment: '₹4-8L',
        marketSize: 'Large'
      },
      {
        title: 'Freelancer Invoice & Tax Platform',
        description: 'Automated invoicing, expense tracking, and tax filing for freelancers and gig workers. Simplifies financial management for independent professionals.',
        difficulty: 'Beginner',
        investment: '₹2-4L',
        marketSize: 'Growing'
      },
      {
        title: 'School Communication Hub',
        description: 'Platform connecting schools, teachers, parents, and students with announcements, assignments, and progress tracking. Modernizes school-home communication.',
        difficulty: 'Intermediate',
        investment: '₹3-6L',
        marketSize: 'Large'
      }
    ],
    ecommerce: [
      {
        title: 'Sustainable Fashion Marketplace',
        description: 'Curated platform for eco-friendly and ethically made clothing. Connects conscious consumers with sustainable brands and local artisans.',
        difficulty: 'Intermediate',
        investment: '₹5-10L',
        marketSize: 'Growing'
      },
      {
        title: 'Hyperlocal Grocery Delivery',
        description: 'Ultra-fast grocery delivery from local stores in 15-30 minutes. Focuses on tier-2 and tier-3 cities with strong local partnerships.',
        difficulty: 'Advanced',
        investment: '₹8-15L',
        marketSize: 'Large'
      },
      {
        title: 'Handmade Crafts Platform',
        description: 'Online marketplace exclusively for Indian handmade products and crafts. Empowers rural artisans with direct access to urban customers.',
        difficulty: 'Beginner',
        investment: '₹2-5L',
        marketSize: 'Medium'
      }
    ],
    personal: [
      {
        title: 'Career Coaching for Tech Professionals',
        description: 'One-on-one coaching and mentorship for software developers looking to advance their careers. Includes resume reviews, interview prep, and salary negotiation.',
        difficulty: 'Beginner',
        investment: '₹50K-1L',
        marketSize: 'Large'
      },
      {
        title: 'Fitness & Nutrition Influencer',
        description: 'Build personal brand around holistic health with workout plans, meal prep guides, and wellness coaching. Monetize through courses and brand partnerships.',
        difficulty: 'Intermediate',
        investment: '₹1-2L',
        marketSize: 'Growing'
      },
      {
        title: 'Financial Literacy Educator',
        description: 'Create content teaching personal finance, investing, and wealth building to young professionals. Revenue from courses, books, and speaking engagements.',
        difficulty: 'Beginner',
        investment: '₹30K-80K',
        marketSize: 'Large'
      }
    ],
    service: [
      {
        title: 'AI-Powered Content Writing Agency',
        description: 'Content creation service using AI tools to deliver high-quality blogs, social media, and marketing copy at scale. Serves startups and SMBs.',
        difficulty: 'Intermediate',
        investment: '₹2-4L',
        marketSize: 'Large'
      },
      {
        title: 'Virtual CFO for Startups',
        description: 'Part-time CFO services for early-stage startups. Handles financial planning, fundraising prep, and investor relations without full-time cost.',
        difficulty: 'Advanced',
        investment: '₹1-3L',
        marketSize: 'Growing'
      },
      {
        title: 'Social Media Management Studio',
        description: 'Full-service social media management for local businesses. Creates content, manages communities, and runs ad campaigns for multiple clients.',
        difficulty: 'Beginner',
        investment: '₹1-2L',
        marketSize: 'Large'
      }
    ],
    offline: [
      {
        title: 'Themed Café & Co-working Space',
        description: 'Hybrid space combining specialty coffee shop with co-working facilities. Targets freelancers and remote workers seeking community and productivity.',
        difficulty: 'Intermediate',
        investment: '₹10-20L',
        marketSize: 'Growing'
      },
      {
        title: 'Boutique Fitness Studio',
        description: 'Specialized fitness studio focusing on specific workout style (yoga, HIIT, dance). Creates strong community with personalized attention.',
        difficulty: 'Intermediate',
        investment: '₹5-12L',
        marketSize: 'Medium'
      },
      {
        title: 'Kids Activity Center',
        description: 'After-school activity center offering coding, arts, sports, and life skills workshops for children. Fills gap in quality extracurricular education.',
        difficulty: 'Advanced',
        investment: '₹8-15L',
        marketSize: 'Growing'
      }
    ]
  };

  return ideasMap[category] || ideasMap.tech;
}

export default router;
