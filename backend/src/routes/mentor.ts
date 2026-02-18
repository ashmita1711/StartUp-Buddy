import { Router } from 'express';
import { getChatResponse } from '../services/gemini';
import { authenticate } from '../middleware/auth';
import { userData } from './auth';

const router = Router();

// Chat with AI mentor - user-specific with enhanced context
router.post('/chat', authenticate, async (req, res) => {
  const { message, conversationId } = req.body;
  const userId = (req as any).user.id;
  
  try {
    // Build comprehensive context from user's startup idea and analysis
    let contextPrompt = message;
    if (userData[userId]?.startupIdea) {
      const idea = userData[userId].startupIdea!;
      const analysis = userData[userId].analysisResults;
      
      // Build rich context for AI
      let context = `You are an expert startup mentor. Here is the user's complete startup context:

STARTUP DETAILS:
- Category: ${idea.category}
- Budget: ₹${idea.budget}
- Experience Level: ${idea.experience}
- Startup Idea: ${idea.idea}
- Analysis Date: ${idea.analyzedAt}`;

      // Add analysis context if available
      if (analysis) {
        context += `\n\nANALYSIS INSIGHTS:`;
        
        if (analysis.recommendations && analysis.recommendations.length > 0) {
          context += `\n- Top Recommendation: ${analysis.recommendations[0].title} - ${analysis.recommendations[0].description}`;
        }
        
        if (analysis.competitors && analysis.competitors.length > 0) {
          context += `\n- Main Competitors: ${analysis.competitors.map((c: any) => c.name).join(', ')}`;
        }
        
        if (analysis.riskAssessment) {
          context += `\n- Risk Level: ${analysis.riskAssessment.overall}`;
        }
        
        if (analysis.coFounderProfile) {
          context += `\n- Recommended Co-Founder: ${analysis.coFounderProfile.role}`;
        }
      }
      
      // Add recent chat history for continuity
      const recentChats = userData[userId].chatHistory.slice(-3);
      if (recentChats.length > 0) {
        context += `\n\nRECENT CONVERSATION:`;
        recentChats.forEach((chat: any) => {
          context += `\nUser: ${chat.message}\nMentor: ${chat.response.substring(0, 100)}...`;
        });
      }
      
      contextPrompt = `${context}

USER'S CURRENT QUESTION: ${message}

INSTRUCTIONS:
- Provide specific, actionable advice tailored to their ${idea.category} startup
- Reference their idea, budget (₹${idea.budget}), and experience level (${idea.experience}) in your response
- Be conversational, supportive, and practical
- Keep responses focused and under 200 words
- If they ask about competitors, roadmap, or specific aspects, use the analysis data above
- Always end with a follow-up question to keep the conversation going

Your response:`;
    } else {
      // No startup context available
      contextPrompt = `You are an expert startup mentor. The user hasn't analyzed their startup idea yet.

USER'S QUESTION: ${message}

Provide helpful general startup advice, but also encourage them to analyze their startup idea on the Dashboard for personalized guidance. Keep it under 150 words.

Your response:`;
    }
    
    // Get response from AI with enhanced context
    const response = await getChatResponse(contextPrompt);
    
    const conversation = {
      id: conversationId || Date.now(),
      message,
      response,
      timestamp: new Date().toISOString()
    };
    
    // Store in user's chat history
    if (userData[userId]) {
      userData[userId].chatHistory.push({
        message,
        response,
        timestamp: conversation.timestamp
      });
      
      // Keep only last 50 messages
      if (userData[userId].chatHistory.length > 50) {
        userData[userId].chatHistory = userData[userId].chatHistory.slice(-50);
      }
    }
    
    res.json(conversation);
  } catch (error: any) {
    console.error('Chat error:', error);
    
    // Enhanced fallback responses based on context
    let fallbackResponse = "I'm here to help with your startup journey! ";
    
    if (userData[userId]?.startupIdea) {
      const idea = userData[userId].startupIdea!;
      fallbackResponse += `For your ${idea.category} startup with ₹${idea.budget} budget, I recommend: `;
      
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('market') || lowerMessage.includes('customer')) {
        fallbackResponse += `Start by conducting 30-50 customer interviews to validate your idea. Focus on understanding their pain points deeply. What specific problem are you solving?`;
      } else if (lowerMessage.includes('mvp') || lowerMessage.includes('build') || lowerMessage.includes('develop')) {
        fallbackResponse += `Build a minimal viable product focusing on your core value proposition. ${idea.experience === 'Beginner' ? 'Consider using no-code tools or finding a technical co-founder.' : 'Start with the features that directly solve your users\' main problem.'} What's your timeline?`;
      } else if (lowerMessage.includes('fund') || lowerMessage.includes('money') || lowerMessage.includes('invest')) {
        fallbackResponse += `${parseInt(idea.budget) < 200000 ? 'With your budget, focus on bootstrapping and proving traction before seeking external funding.' : 'You have a solid budget to build an MVP. Focus on customer acquisition and proving product-market fit.'} Have you calculated your runway?`;
      } else if (lowerMessage.includes('team') || lowerMessage.includes('hire') || lowerMessage.includes('cofounder')) {
        fallbackResponse += `${idea.experience === 'Beginner' ? 'Look for a co-founder with complementary skills, especially technical expertise.' : 'Start with contractors before full-time hires. Focus on cultural fit and shared vision.'} What roles are you looking to fill?`;
      } else {
        fallbackResponse += `Focus on validating your idea with real customers, building an MVP, and iterating based on feedback. What's your biggest challenge right now?`;
      }
    } else {
      fallbackResponse += `I'd love to give you personalized advice! Please analyze your startup idea on the Dashboard first, then I can provide specific guidance tailored to your situation. What aspect of your startup would you like to discuss?`;
    }
    
    res.json({
      id: Date.now(),
      message,
      response: fallbackResponse,
      timestamp: new Date().toISOString()
    });
  }
});

// Get user's chat history
router.get('/history', authenticate, (req, res) => {
  const userId = (req as any).user.id;
  const history = userData[userId]?.chatHistory || [];
  
  res.json({ 
    conversations: history.slice(-10).map((chat, index) => ({
      id: Date.now() - index,
      message: chat.message,
      response: chat.response,
      timestamp: chat.timestamp
    }))
  });
});

// Get personalized suggestions based on user's startup
router.get('/suggestions', authenticate, (req, res) => {
  const userId = (req as any).user.id;
  const user = userData[userId];
  
  let suggestions = [
    'How do I validate my startup idea?',
    'What should be in my pitch deck?',
    'How to calculate my burn rate?',
    'When should I hire my first employee?'
  ];
  
  // Personalize suggestions based on user's startup
  if (user?.startupIdea) {
    const { category, experience, budget } = user.startupIdea;
    const budgetNum = parseInt(budget);
    
    suggestions = [
      `How do I validate my ${category} startup idea?`,
      experience === 'Beginner' ? 'What skills do I need to learn first?' : 'How do I scale my team effectively?',
      budgetNum < 200000 ? 'How can I bootstrap with limited budget?' : 'Should I raise funding or bootstrap?',
      `What are the key metrics for ${category} startups?`,
      'How do I find the right co-founder?',
      'What marketing channels work best for my niche?',
      'How do I price my product competitively?',
      'What are common mistakes in my industry?'
    ];
  }
  
  res.json({ suggestions });
});

export default router;
