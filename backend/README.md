# StartUp-Buddy Backend

Backend API for the StartUp-Buddy platform.

## Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Dashboard
- `GET /api/dashboard/metrics` - Get startup metrics

### Mentor
- `POST /api/mentor/chat` - Chat with AI mentor

### Financial
- `POST /api/financial/runway` - Calculate financial runway

### Risk
- `POST /api/risk/assess` - Assess startup risks

### Competitor Analysis
- `POST /api/competitor/analyze` - Analyze competitors
- `GET /api/competitor/market-trends` - Get market trends

### Co-Founder Matching
- `POST /api/cofounder/match` - Find co-founder matches
- `GET /api/cofounder/personas` - Get co-founder personas

### Analytics
- `GET /api/analytics/overview` - Get analytics overview
- `GET /api/analytics/metrics` - Get key metrics

### Startups
- `GET /api/startups` - List all startups
- `POST /api/startups` - Create new startup
- `GET /api/startups/:id` - Get startup by ID
- `PUT /api/startups/:id` - Update startup
- `DELETE /api/startups/:id` - Delete startup

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production build
