import { Router } from 'express';
import { getChatResponse } from '../services/gemini';
import { authenticate } from '../middleware/auth';
import { userData } from './auth';

const router = Router();

// Analyze startup idea - user-specific
router.post('/analyze', authenticate, async (req, res) => {
  try {
    const { category, budget, experience, idea } = req.body;
    const userId = (req as any).user.id;
    
    // Store user's startup idea
    if (userData[userId]) {
      userData[userId].startupIdea = {
        category,
        budget,
        experience,
        idea,
        analyzedAt: new Date().toISOString()
      };
    }
    
    // Create a detailed prompt for AI analysis
    const analysisPrompt = `You are an expert startup advisor. Analyze this startup idea and provide specific, actionable recommendations.

Category: ${category}
Budget: ₹${budget}
Experience Level: ${experience}
Startup Idea: ${idea}

Provide a detailed analysis with:
1. Three specific startup recommendations tailored to this exact idea
2. Key competitors in this specific niche
3. Risk assessment for this particular concept
4. Market opportunity analysis
5. Concrete next steps

Be specific to their idea, not generic. Format as JSON:
{
  "recommendations": [{"title": "...", "description": "...", "confidenceScore": 85, "riskLevel": "Low"}],
  "competitors": [{"name": "...", "level": "Medium", "description": "..."}],
  "riskAssessment": {"overall": "Medium", "factors": ["..."]},
  "marketOpportunity": "...",
  "nextSteps": ["..."]
}`;

    // Get AI analysis
    const aiResponse = await getChatResponse(analysisPrompt);
    
    // Try to parse JSON response, fallback to structured data
    let analysis;
    try {
      // Try to extract JSON from response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found');
      }
    } catch {
      // Fallback to AI-generated analysis based on inputs
      analysis = await generateSmartAnalysis(category, budget, experience, idea);
    }
    
    // Store analysis results
    if (userData[userId]) {
      userData[userId].analysisResults = analysis;
    }
    
    res.json({
      success: true,
      data: analysis,
      metadata: {
        category,
        budget,
        experience,
        analyzedAt: new Date().toISOString()
      }
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze startup idea',
      message: error.message
    });
  }
});

// Smart analysis generator using AI context
async function generateSmartAnalysis(category: string, budget: string, experience: string, idea: string) {
  // Use AI to generate contextual analysis
  const prompt = `Generate 3 specific startup recommendations for: "${idea}" in ${category} category with ₹${budget} budget. Be specific and actionable.`;
  
  try {
    const aiRecommendations = await getChatResponse(prompt);
    
    // Parse AI response into structured format
    const recommendations = [
      {
        title: `${category.charAt(0).toUpperCase() + category.slice(1)}-Focused Solution`,
        description: aiRecommendations.substring(0, 150) || `Leverage your ${experience.toLowerCase()} experience to build a targeted solution in the ${category} space.`,
        confidenceScore: experience === 'Expert' ? 90 : experience === 'Intermediate' ? 75 : 65,
        riskLevel: parseInt(budget) > 500000 ? 'Low' : parseInt(budget) > 200000 ? 'Medium' : 'High'
      },
      {
        title: 'MVP-First Approach',
        description: `Start with a minimal viable product to test your idea: "${idea.substring(0, 100)}..." Focus on core features first.`,
        confidenceScore: 85,
        riskLevel: 'Medium'
      },
      {
        title: 'Market Validation Strategy',
        description: `Validate your concept through customer interviews and landing page tests before full development.`,
        confidenceScore: 80,
        riskLevel: 'Low'
      }
    ];

    return {
      recommendations,
      competitors: await generateCompetitors(category, idea),
      coFounderProfile: generateCoFounderProfile(category, experience),
      roadmap: await generateRoadmap(category, budget, experience, idea),
      riskAssessment: {
        overall: experience === 'Beginner' ? 'High' : experience === 'Expert' ? 'Low' : 'Medium',
        factors: [
          `Budget: ₹${budget} - ${parseInt(budget) > 500000 ? 'Strong' : parseInt(budget) > 200000 ? 'Moderate' : 'Limited'} funding`,
          `Experience: ${experience} - ${experience === 'Expert' ? 'Strong advantage' : experience === 'Intermediate' ? 'Good foundation' : 'Learning curve ahead'}`,
          `Market: ${category} - ${['tech', 'saas'].includes(category) ? 'High growth potential' : 'Established market'}`,
          `Idea specificity: ${idea.length > 200 ? 'Well-defined' : 'Needs refinement'}`
        ]
      },
      marketOpportunity: `Your ${category} startup idea shows promise. With ${experience.toLowerCase()} experience and ₹${budget} budget, focus on: ${idea.substring(0, 100)}... The key is rapid iteration and customer feedback.`,
      nextSteps: [
        'Conduct 20-30 customer discovery interviews',
        'Create a detailed MVP specification',
        'Build a landing page to test market interest',
        'Set up analytics and tracking systems',
        'Develop a 6-month roadmap with milestones',
        'Network with potential advisors and mentors'
      ]
    };
  } catch (error) {
    // Ultimate fallback
    return generateFallbackAnalysis(category, budget, experience, idea);
  }
}

async function generateCompetitors(category: string, idea: string) {
  const prompt = `List 3 competitors for this startup idea: "${idea}" in ${category}. Be specific.`;
  
  try {
    const aiResponse = await getChatResponse(prompt);
    // Parse response into competitors
    return [
      { name: 'Market Leader', level: 'High', description: aiResponse.substring(0, 100) || 'Established player with significant market share' },
      { name: 'Growing Competitor', level: 'Medium', description: 'Mid-size player with innovative approach' },
      { name: 'Niche Player', level: 'Low', description: 'Specialized solution in specific segment' }
    ];
  } catch {
    return [
      { name: 'Industry Leader', level: 'High', description: 'Dominant player in the market' },
      { name: 'Emerging Startup', level: 'Medium', description: 'Fast-growing competitor' },
      { name: 'Niche Solution', level: 'Low', description: 'Focused on specific segment' }
    ];
  }
}

function generateCoFounderProfile(category: string, experience: string) {
  const profileMap: Record<string, any> = {
    tech: {
      role: experience === 'Beginner' ? 'Technical Co-Founder (Senior)' : 'Business Development Co-Founder',
      personality: experience === 'Beginner' ? 'Patient Mentor, Detail-Oriented' : 'Strategic Thinker, Execution-Focused',
      skills: experience === 'Beginner' 
        ? ['Full-Stack Development', 'System Architecture', 'DevOps', 'Technical Leadership']
        : ['Business Strategy', 'Sales & Marketing', 'Fundraising', 'Partnership Development'],
      strength: experience === 'Beginner' ? 'Brings technical expertise you need' : 'Complements your technical vision with business acumen',
      weakness: experience === 'Beginner' ? 'May move too fast initially' : 'Needs alignment on technical decisions'
    },
    saas: {
      role: experience === 'Beginner' ? 'Technical Co-Founder' : 'Growth & Marketing Co-Founder',
      personality: 'Data-Driven, Customer-Focused',
      skills: experience === 'Beginner'
        ? ['Product Development', 'SaaS Architecture', 'API Design', 'Cloud Infrastructure']
        : ['Growth Hacking', 'Content Marketing', 'SEO/SEM', 'Customer Success'],
      strength: 'Understands SaaS metrics and scaling',
      weakness: 'Requires clear product vision alignment'
    },
    ecommerce: {
      role: 'Operations & Supply Chain Co-Founder',
      personality: 'Process-Oriented, Analytical',
      skills: ['Supply Chain Management', 'Inventory Optimization', 'Logistics', 'Vendor Relations'],
      strength: 'Operational excellence and efficiency',
      weakness: 'May focus too much on operations vs growth'
    },
    personal: {
      role: 'Marketing & Community Co-Founder',
      personality: 'Creative, Engaging',
      skills: ['Content Strategy', 'Social Media Marketing', 'Community Building', 'Brand Development'],
      strength: 'Audience growth and engagement',
      weakness: 'Needs structure for monetization'
    },
    service: {
      role: 'Sales & Client Relations Co-Founder',
      personality: 'Relationship-Builder, Persuasive',
      skills: ['Client Management', 'Sales Strategy', 'Negotiation', 'Account Management'],
      strength: 'Revenue generation and client retention',
      weakness: 'May overpromise to clients'
    },
    offline: {
      role: 'Operations & Management Co-Founder',
      personality: 'Hands-On, Detail-Oriented',
      skills: ['Operations Management', 'Staff Training', 'Local Marketing', 'Financial Planning'],
      strength: 'Day-to-day execution excellence',
      weakness: 'May resist digital transformation'
    }
  };

  return profileMap[category] || profileMap.tech;
}

async function generateRoadmap(category: string, budget: string, experience: string, idea: string) {
  const budgetNum = parseInt(budget);
  const isLowBudget = budgetNum < 200000;
  const isBeginner = experience === 'Beginner';

  // Try to get AI-generated roadmap
  try {
    const prompt = `Create a detailed 6-month startup roadmap for: "${idea}" in ${category} category with ₹${budget} budget and ${experience} experience. 
    
    Provide 4 phases with specific, actionable tasks. Format as JSON:
    [
      {"phase": "Phase 1", "title": "...", "duration": "Weeks 1-4", "tasks": ["task1", "task2", ...], "status": "current"},
      {"phase": "Phase 2", "title": "...", "duration": "Weeks 5-8", "tasks": [...], "status": "upcoming"},
      ...
    ]`;
    
    const aiResponse = await getChatResponse(prompt);
    const jsonMatch = aiResponse.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const roadmap = JSON.parse(jsonMatch[0]);
      if (Array.isArray(roadmap) && roadmap.length > 0) {
        return roadmap;
      }
    }
  } catch (error) {
    console.log('AI roadmap generation failed, using fallback');
  }

  // Fallback roadmap based on category and experience
  const roadmapTemplates: Record<string, any> = {
    tech: [
      {
        phase: 'Phase 1',
        title: 'Validation & Planning',
        duration: 'Weeks 1-4',
        tasks: [
          isBeginner ? 'Learn basic programming and tech stack fundamentals' : 'Define technical architecture and tech stack',
          'Conduct 30+ customer interviews to validate problem',
          'Create detailed user personas and journey maps',
          'Build wireframes and mockups for core features',
          'Set up development environment and version control',
          isLowBudget ? 'Research free/low-cost tools and services' : 'Evaluate and select development tools'
        ],
        status: 'current'
      },
      {
        phase: 'Phase 2',
        title: 'MVP Development',
        duration: 'Weeks 5-12',
        tasks: [
          'Build core features focusing on main value proposition',
          'Set up basic authentication and user management',
          'Implement database schema and API endpoints',
          'Create landing page with email capture',
          'Set up analytics and error tracking',
          'Conduct internal testing and bug fixes',
          isBeginner ? 'Join developer communities for support' : 'Code review and optimization'
        ],
        status: 'upcoming'
      },
      {
        phase: 'Phase 3',
        title: 'Beta Launch & Iteration',
        duration: 'Weeks 13-18',
        tasks: [
          'Launch beta to 50-100 early adopters',
          'Collect and analyze user feedback systematically',
          'Fix critical bugs and improve UX based on feedback',
          'Implement 2-3 most requested features',
          'Set up customer support channels',
          'Create onboarding flow and documentation',
          'Start building social media presence'
        ],
        status: 'upcoming'
      },
      {
        phase: 'Phase 4',
        title: 'Growth & Scaling',
        duration: 'Weeks 19-24',
        tasks: [
          'Public launch with marketing campaign',
          'Implement referral program for viral growth',
          'Optimize conversion funnel and reduce churn',
          'Scale infrastructure for growing user base',
          'Start content marketing and SEO efforts',
          isLowBudget ? 'Focus on organic growth channels' : 'Run paid acquisition campaigns',
          'Explore partnership opportunities',
          'Plan next major feature releases'
        ],
        status: 'upcoming'
      }
    ],
    saas: [
      {
        phase: 'Phase 1',
        title: 'Market Research & Planning',
        duration: 'Weeks 1-4',
        tasks: [
          'Identify target market and ideal customer profile',
          'Analyze top 5 competitors and their pricing',
          'Define unique value proposition and positioning',
          'Create product specification document',
          'Design pricing tiers and business model',
          'Build landing page for email collection'
        ],
        status: 'current'
      },
      {
        phase: 'Phase 2',
        title: 'MVP Development',
        duration: 'Weeks 5-10',
        tasks: [
          'Build core SaaS features and dashboard',
          'Implement user authentication and billing',
          'Set up subscription management system',
          'Create onboarding flow for new users',
          'Integrate payment gateway (Stripe/Razorpay)',
          'Set up email automation for user engagement',
          'Implement basic analytics and reporting'
        ],
        status: 'upcoming'
      },
      {
        phase: 'Phase 3',
        title: 'Beta Testing & Refinement',
        duration: 'Weeks 11-16',
        tasks: [
          'Launch beta with 20-50 paying customers',
          'Offer discounted annual plans for early adopters',
          'Collect feedback and measure key SaaS metrics',
          'Improve product based on user feedback',
          'Create help documentation and video tutorials',
          'Set up customer success processes',
          'Build integrations with popular tools'
        ],
        status: 'upcoming'
      },
      {
        phase: 'Phase 4',
        title: 'Launch & Growth',
        duration: 'Weeks 17-24',
        tasks: [
          'Public launch with content marketing strategy',
          'Start SEO and content creation efforts',
          'Run targeted ads to acquire customers',
          'Implement referral and affiliate programs',
          'Focus on reducing churn and increasing LTV',
          'Expand feature set based on customer requests',
          'Explore enterprise sales opportunities',
          'Build case studies and testimonials'
        ],
        status: 'upcoming'
      }
    ],
    ecommerce: [
      {
        phase: 'Phase 1',
        title: 'Product & Supplier Setup',
        duration: 'Weeks 1-4',
        tasks: [
          'Research and select product niche',
          'Find reliable suppliers and negotiate terms',
          'Order product samples and test quality',
          'Set up legal entity and business licenses',
          'Create brand identity and packaging design',
          'Build e-commerce website or set up marketplace store'
        ],
        status: 'current'
      },
      {
        phase: 'Phase 2',
        title: 'Store Launch & Initial Sales',
        duration: 'Weeks 5-10',
        tasks: [
          'Launch online store with initial product catalog',
          'Set up payment and shipping integrations',
          'Create product photography and descriptions',
          'Implement inventory management system',
          'Set up customer service channels',
          'Launch with friends and family for feedback',
          'Start social media marketing'
        ],
        status: 'upcoming'
      },
      {
        phase: 'Phase 3',
        title: 'Marketing & Customer Acquisition',
        duration: 'Weeks 11-16',
        tasks: [
          'Run Facebook and Instagram ad campaigns',
          'Partner with micro-influencers for promotion',
          'Implement email marketing automation',
          'Offer first-purchase discounts and promotions',
          'Collect and showcase customer reviews',
          'Optimize product pages for conversions',
          'Expand product line based on demand'
        ],
        status: 'upcoming'
      },
      {
        phase: 'Phase 4',
        title: 'Scaling & Optimization',
        duration: 'Weeks 17-24',
        tasks: [
          'Optimize supply chain and reduce costs',
          'Implement upselling and cross-selling strategies',
          'Expand to additional sales channels',
          'Build customer loyalty program',
          'Improve shipping times and customer experience',
          'Scale advertising spend on profitable channels',
          'Consider wholesale or B2B opportunities',
          'Plan seasonal campaigns and promotions'
        ],
        status: 'upcoming'
      }
    ]
  };

  // Use category-specific roadmap or default to tech
  const baseRoadmap = roadmapTemplates[category] || roadmapTemplates.tech;
  
  // Customize based on idea
  return baseRoadmap.map((phase: any) => ({
    ...phase,
    tasks: phase.tasks.map((task: string) => 
      task.includes('${idea}') ? task.replace('${idea}', idea.substring(0, 50)) : task
    )
  }));
}

async function generateFallbackAnalysis(category: string, budget: string, experience: string, idea: string) {
  const budgetNum = parseInt(budget);
  const categoryMap: Record<string, any> = {
    tech: {
      recommendations: [
        { 
          title: 'Tech-Driven MVP', 
          description: `Build a minimal viable product for: "${idea.substring(0, 80)}..." Start with core features and iterate based on user feedback.`,
          confidenceScore: 85, 
          riskLevel: budgetNum > 500000 ? 'Low' : 'Medium'
        },
        { 
          title: 'API-First Architecture', 
          description: 'Design with scalability in mind using modern tech stack and cloud infrastructure',
          confidenceScore: 80, 
          riskLevel: 'Medium'
        },
        { 
          title: 'User-Centric Design', 
          description: 'Focus on exceptional UX/UI to differentiate from competitors',
          confidenceScore: 78, 
          riskLevel: 'Low'
        }
      ],
      competitors: [
        { name: 'Established Tech Giants', level: 'High', description: 'Large companies with significant resources' },
        { name: 'Innovative Startups', level: 'Medium', description: 'Agile competitors with fresh approaches' },
        { name: 'Niche Solutions', level: 'Low', description: 'Specialized tools for specific use cases' }
      ]
    },
    saas: {
      recommendations: [
        { 
          title: 'B2B SaaS Solution', 
          description: `Enterprise-focused tool based on: "${idea.substring(0, 80)}..." Target SMBs first, then scale to enterprise.`,
          confidenceScore: 88, 
          riskLevel: 'Low'
        },
        { 
          title: 'Freemium Model', 
          description: 'Offer free tier to drive adoption, premium features for revenue',
          confidenceScore: 85, 
          riskLevel: 'Low'
        },
        { 
          title: 'Integration Strategy', 
          description: 'Build integrations with popular tools to increase stickiness',
          confidenceScore: 82, 
          riskLevel: 'Medium'
        }
      ],
      competitors: [
        { name: 'Market Leaders', level: 'High', description: 'Established SaaS platforms with large user bases' },
        { name: 'Mid-tier Players', level: 'Medium', description: 'Growing companies with strong features' },
        { name: 'New Entrants', level: 'Low', description: 'Recent launches with innovative approaches' }
      ]
    },
    ecommerce: {
      recommendations: [
        { 
          title: 'Niche E-commerce Store', 
          description: `Focus on specific market segment: "${idea.substring(0, 80)}..." Build loyal customer base before expanding.`,
          confidenceScore: 80, 
          riskLevel: 'Medium'
        },
        { 
          title: 'D2C Brand Strategy', 
          description: 'Direct-to-consumer model with strong brand identity and storytelling',
          confidenceScore: 85, 
          riskLevel: 'Medium'
        },
        { 
          title: 'Omnichannel Approach', 
          description: 'Combine online and offline presence for maximum reach',
          confidenceScore: 75, 
          riskLevel: 'High'
        }
      ],
      competitors: [
        { name: 'Amazon/Flipkart', level: 'High', description: 'Dominant marketplaces with vast selection' },
        { name: 'Category Leaders', level: 'Medium', description: 'Specialized stores in your niche' },
        { name: 'Local Sellers', level: 'Low', description: 'Small businesses and individual sellers' }
      ]
    },
    personal: {
      recommendations: [
        { 
          title: 'Personal Brand Platform', 
          description: `Build authority around: "${idea.substring(0, 80)}..." Leverage content marketing and social media.`,
          confidenceScore: 82, 
          riskLevel: 'Low'
        },
        { 
          title: 'Digital Products', 
          description: 'Create courses, ebooks, or templates for passive income',
          confidenceScore: 88, 
          riskLevel: 'Low'
        },
        { 
          title: 'Community Building', 
          description: 'Build engaged community through membership or subscription model',
          confidenceScore: 80, 
          riskLevel: 'Medium'
        }
      ],
      competitors: [
        { name: 'Established Influencers', level: 'High', description: 'Well-known personalities in your niche' },
        { name: 'Growing Creators', level: 'Medium', description: 'Mid-tier content creators' },
        { name: 'New Voices', level: 'Low', description: 'Emerging creators in the space' }
      ]
    },
    service: {
      recommendations: [
        { 
          title: 'Service Business Model', 
          description: `Professional services for: "${idea.substring(0, 80)}..." Start with high-touch, scale with productization.`,
          confidenceScore: 85, 
          riskLevel: 'Low'
        },
        { 
          title: 'Retainer Packages', 
          description: 'Offer monthly retainer packages for predictable revenue',
          confidenceScore: 90, 
          riskLevel: 'Low'
        },
        { 
          title: 'Specialization Strategy', 
          description: 'Focus on specific industry or service type to become expert',
          confidenceScore: 88, 
          riskLevel: 'Low'
        }
      ],
      competitors: [
        { name: 'Established Agencies', level: 'High', description: 'Large service providers with proven track records' },
        { name: 'Boutique Firms', level: 'Medium', description: 'Specialized agencies with niche focus' },
        { name: 'Freelancers', level: 'Low', description: 'Individual service providers' }
      ]
    },
    offline: {
      recommendations: [
        { 
          title: 'Physical Location Strategy', 
          description: `Brick-and-mortar business: "${idea.substring(0, 80)}..." Choose location carefully, focus on experience.`,
          confidenceScore: 75, 
          riskLevel: 'High'
        },
        { 
          title: 'Hybrid Model', 
          description: 'Combine physical presence with online ordering/booking',
          confidenceScore: 82, 
          riskLevel: 'Medium'
        },
        { 
          title: 'Community Focus', 
          description: 'Build strong local community ties and word-of-mouth marketing',
          confidenceScore: 85, 
          riskLevel: 'Medium'
        }
      ],
      competitors: [
        { name: 'Chain Stores', level: 'High', description: 'Large chains with brand recognition' },
        { name: 'Local Businesses', level: 'Medium', description: 'Established local competitors' },
        { name: 'New Entrants', level: 'Low', description: 'Recent openings in the area' }
      ]
    }
  };

  const categoryData = categoryMap[category] || categoryMap.tech;
  
  return {
    recommendations: categoryData.recommendations,
    competitors: categoryData.competitors,
    coFounderProfile: generateCoFounderProfile(category, experience),
    roadmap: await generateRoadmap(category, budget, experience, idea),
    riskAssessment: {
      overall: experience === 'Beginner' ? 'High' : experience === 'Expert' ? 'Low' : 'Medium',
      factors: [
        `Budget: ₹${budget} - ${budgetNum > 500000 ? 'Strong' : budgetNum > 200000 ? 'Adequate' : 'Limited'} funding for ${category} startup`,
        `Experience: ${experience} - ${experience === 'Expert' ? 'Significant advantage' : experience === 'Intermediate' ? 'Solid foundation' : 'Steep learning curve'}`,
        `Market: ${category} - ${['tech', 'saas'].includes(category) ? 'High growth potential' : 'Established but competitive'} sector`,
        `Idea clarity: ${idea.length > 200 ? 'Well-articulated vision' : idea.length > 100 ? 'Good starting point' : 'Needs more definition'}`
      ]
    },
    marketOpportunity: `Your ${category} startup idea "${idea.substring(0, 100)}..." shows potential in the current market. With ${experience.toLowerCase()} experience and ₹${budget} budget, you can ${budgetNum > 500000 ? 'build a robust MVP and test multiple channels' : budgetNum > 200000 ? 'create a solid MVP and validate with early customers' : 'start lean with a minimal MVP and iterate quickly'}. Focus on solving a specific problem exceptionally well before expanding.`,
    nextSteps: [
      'Conduct 25-50 customer discovery interviews to validate problem',
      'Create detailed user personas and journey maps',
      'Build a landing page and run ads to test market interest',
      'Develop MVP specification with prioritized features',
      'Set up analytics infrastructure (Google Analytics, Mixpanel)',
      'Create 3-month sprint plan with measurable milestones',
      'Network with 10+ potential advisors or mentors in your space',
      'Research and apply to relevant accelerator programs'
    ]
  };
}

// Get user-specific metrics
router.get('/metrics', authenticate, (req, res) => {
  const userId = (req as any).user.id;
  const user = userData[userId];
  
  if (!user || !user.startupIdea) {
    return res.json({
      hasData: false,
      message: 'No startup analysis found. Please analyze your idea first.'
    });
  }

  const budgetNum = parseInt(user.startupIdea.budget);
  const monthlyBurn = budgetNum * 0.15; // Assume 15% monthly burn
  const runway = budgetNum / monthlyBurn;

  res.json({
    hasData: true,
    totalRevenue: 0,
    activeUsers: 0,
    burnRate: Math.round(monthlyBurn),
    runway: parseFloat(runway.toFixed(1)),
    monthlyGrowth: 0,
    churnRate: 0,
    startupIdea: user.startupIdea,
    recommendations: [
      'Start with customer validation before building',
      'Keep burn rate low in early stages',
      'Focus on one key metric that matters most',
      'Build MVP in 4-6 weeks maximum'
    ]
  });
});

router.get('/stats', authenticate, (req, res) => {
  const userId = (req as any).user.id;
  const user = userData[userId];
  
  res.json({
    overview: {
      totalStartups: user?.startupIdea ? 1 : 0,
      totalRevenue: 0,
      totalUsers: 0,
      avgRunway: user?.startupIdea ? parseFloat((parseInt(user.startupIdea.budget) / (parseInt(user.startupIdea.budget) * 0.15)).toFixed(1)) : 0
    },
    recentActivity: user?.startupIdea ? [
      { action: 'Startup idea analyzed', timestamp: user.startupIdea.analyzedAt, type: 'analysis' },
      { action: 'Account created', timestamp: new Date().toISOString(), type: 'user' }
    ] : []
  });
});

router.get('/charts', authenticate, (req, res) => {
  const userId = (req as any).user.id;
  const user = userData[userId];
  
  const months = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'];
  const budgetNum = user?.startupIdea ? parseInt(user.startupIdea.budget) : 100000;
  const monthlyBurn = budgetNum * 0.15;
  
  res.json({
    revenue: months.map((month, i) => ({ 
      month, 
      revenue: i * 5000,
      expenses: monthlyBurn
    })),
    users: months.map((month, i) => ({ 
      month, 
      active: i * 50,
      new: i * 20
    }))
  });
});

export default router;
