# Google Gemini AI Integration Setup

## Getting Your Gemini API Key

1. **Go to Google AI Studio**
   - Visit: https://makersuite.google.com/app/apikey
   - Or: https://aistudio.google.com/app/apikey

2. **Sign in with your Google Account**

3. **Create API Key**
   - Click "Create API Key"
   - Select "Create API key in new project" or choose an existing project
   - Copy the generated API key

4. **Add to Environment Variables**
   - Open `backend/.env` file
   - Add your API key:
     ```
     GEMINI_API_KEY=your_actual_api_key_here
     ```

5. **Restart the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```

## Features

The AI Mentor now uses Google Gemini Pro to:
- Answer any startup-related questions
- Provide personalized advice based on context
- Maintain conversation context
- Give actionable, practical recommendations

## Usage Limits

- **Free Tier**: 60 requests per minute
- **Rate Limits**: Automatically handled with fallback responses
- **Cost**: Free for moderate usage

## Testing

Try asking questions like:
- "How do I validate my startup idea?"
- "What should I include in my pitch deck?"
- "How do I find my first customers?"
- "What metrics should I track for a SaaS startup?"
- "How do I price my product?"

## Fallback System

If the Gemini API is unavailable or rate-limited, the system automatically falls back to keyword-based responses to ensure the chatbot always works.

## Security Notes

- Never commit your `.env` file to git
- Keep your API key private
- Rotate keys if exposed
- Monitor usage in Google Cloud Console
