import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are an expert startup mentor and advisor with deep knowledge in:
- Business strategy and planning
- Product development and MVP creation
- Fundraising and investor relations
- Marketing and growth strategies
- Team building and hiring
- Financial planning and runway management
- Risk assessment and mitigation
- Market analysis and competition

Your role is to provide practical, actionable advice to entrepreneurs and startup founders. 
Be concise, supportive, and focus on real-world solutions. When appropriate, ask clarifying 
questions to better understand their situation. Keep responses under 150 words unless more 
detail is specifically requested.`;

// Hugging Face Free API - No login required!
async function getHuggingFaceResponse(userMessage: string): Promise<string> {
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: `${SYSTEM_PROMPT}\n\nUser: ${userMessage}\n\nAssistant:`,
          parameters: {
            max_new_tokens: 300,
            temperature: 0.7,
            top_p: 0.95,
            return_full_text: false,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Hugging Face API error');
    }

    const data = await response.json();
    const result = data as any;
    return result[0]?.generated_text?.trim() || getFallbackResponse(userMessage);
  } catch (error) {
    console.error('Hugging Face API error:', error);
    return getFallbackResponse(userMessage);
  }
}

export async function getChatResponse(userMessage: string): Promise<string> {
  try {
    // Try Hugging Face first (free, no API key needed)
    const response = await getHuggingFaceResponse(userMessage);
    return response;
  } catch (error: any) {
    console.error('AI API error:', error);
    return getFallbackResponse(userMessage);
  }
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Greetings
  if (lowerMessage.match(/^(hi|hello|hey|greetings)/)) {
    return 'Hello! I\'m your AI startup mentor. I can help you with fundraising, product development, team building, marketing strategies, and more. What challenge are you facing today?';
  }
  
  // Funding/Investment
  if (lowerMessage.includes('funding') || lowerMessage.includes('investor') || lowerMessage.includes('raise') || lowerMessage.includes('capital')) {
    return 'For fundraising, focus on: 1) Strong pitch deck with clear problem/solution, 2) Proven traction and metrics, 3) Network with angel investors first, 4) Perfect your 2-minute elevator pitch. Would you like specific advice on any of these areas?';
  }
  
  // Market/Competition
  if (lowerMessage.includes('market') || lowerMessage.includes('competition') || lowerMessage.includes('competitor')) {
    return 'Market analysis is crucial. Research your competitors thoroughly, identify gaps in their offerings, and position your unique value proposition. Use tools like SEMrush and SimilarWeb for competitive intelligence. What specific aspect would you like to explore?';
  }
  
  // Team/Hiring
  if (lowerMessage.includes('team') || lowerMessage.includes('hire') || lowerMessage.includes('cofounder') || lowerMessage.includes('co-founder')) {
    return 'Building the right team is essential. Hire for culture fit and complementary skills. Start with a strong technical co-founder and focus on generalists in early stages. Use equity wisely to attract top talent. What role are you looking to fill?';
  }
  
  // Product/MVP
  if (lowerMessage.includes('product') || lowerMessage.includes('mvp') || lowerMessage.includes('feature') || lowerMessage.includes('build')) {
    return 'For MVP development: 1) Identify core features only, 2) Get user feedback early and often, 3) Iterate quickly based on data, 4) Don\'t over-engineer - ship fast and learn. What stage is your product at?';
  }
  
  // Pricing
  if (lowerMessage.includes('price') || lowerMessage.includes('pricing') || lowerMessage.includes('charge')) {
    return 'For pricing strategy: 1) Research competitor pricing, 2) Calculate your costs and desired margins, 3) Consider value-based pricing, 4) Start higher and adjust based on feedback. Would you like help with a specific pricing model?';
  }
  
  // Customer Acquisition
  if (lowerMessage.includes('customer') || lowerMessage.includes('user') || lowerMessage.includes('acquisition') || lowerMessage.includes('growth')) {
    return 'Customer acquisition: 1) Identify your ideal customer profile, 2) Start with direct outreach and personal connections, 3) Create valuable content, 4) Leverage social proof and testimonials. What\'s your target customer segment?';
  }
  
  // Idea Validation
  if (lowerMessage.includes('idea') || lowerMessage.includes('validate') || lowerMessage.includes('test')) {
    return 'Great! Let\'s validate your idea. Key steps: 1) Talk to 50+ potential customers, 2) Create a landing page to test interest, 3) Run small paid ad campaigns, 4) Build a minimal MVP to test assumptions. What\'s your startup idea about?';
  }
  
  // Marketing
  if (lowerMessage.includes('market') || lowerMessage.includes('advertis') || lowerMessage.includes('promotion') || lowerMessage.includes('seo')) {
    return 'For marketing: 1) Focus on one channel at a time, 2) Content marketing builds long-term value, 3) Leverage social media where your customers are, 4) Track metrics religiously. What\'s your primary marketing channel?';
  }
  
  // Financial/Runway
  if (lowerMessage.includes('runway') || lowerMessage.includes('burn') || lowerMessage.includes('financial') || lowerMessage.includes('budget')) {
    return 'Financial planning is critical. Calculate your monthly burn rate, track runway carefully, and aim for 18+ months of runway. Cut unnecessary costs and focus on revenue-generating activities. Need help calculating your runway?';
  }
  
  // Strategy/Planning
  if (lowerMessage.includes('strategy') || lowerMessage.includes('plan') || lowerMessage.includes('roadmap')) {
    return 'Strategic planning: 1) Set clear, measurable goals, 2) Focus on 1-2 key metrics, 3) Plan in 90-day sprints, 4) Review and adjust regularly. What\'s your main goal for the next quarter?';
  }
  
  // Generic but more helpful
  const topics = message.split(' ').filter(word => word.length > 3);
  const mainTopic = topics[0] || 'your question';
  
  return `I can help you with "${mainTopic}"! As your startup mentor, I specialize in:

• Fundraising & investor relations
• Product development & MVP strategy  
• Team building & hiring
• Marketing & customer acquisition
• Financial planning & runway management
• Market analysis & competition

What specific challenge are you facing? The more details you share, the better I can help!`;
}

