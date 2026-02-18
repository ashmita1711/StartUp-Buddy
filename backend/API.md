# StartUp-Buddy API Documentation

Base URL: `http://localhost:3000/api`

## Authentication

### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

## Dashboard

### Get Metrics
```http
GET /api/dashboard/metrics
```

### Get Statistics
```http
GET /api/dashboard/stats
```

### Get Charts Data
```http
GET /api/dashboard/charts
```

## Financial

### Calculate Runway
```http
POST /api/financial/runway
Content-Type: application/json

{
  "currentCash": 500000,
  "monthlyBurn": 50000,
  "monthlyRevenue": 30000
}
```

### Get Forecast
```http
POST /api/financial/forecast
Content-Type: application/json

{
  "currentCash": 500000,
  "monthlyBurn": 50000,
  "monthlyRevenue": 30000,
  "growthRate": 0.05
}
```

### Get Financial Metrics
```http
GET /api/financial/metrics
```

## Risk Assessment

### Assess Risks
```http
POST /api/risk/assess
Content-Type: application/json

{
  "industry": "SaaS",
  "stage": "Seed",
  "teamSize": 5,
  "funding": 500000
}
```

### Get Risk Categories
```http
GET /api/risk/categories
```

## AI Mentor

### Chat with Mentor
```http
POST /api/mentor/chat
Content-Type: application/json

{
  "message": "How do I find investors?",
  "conversationId": 123456
}
```

### Get Chat History
```http
GET /api/mentor/history
```

### Get Suggestions
```http
GET /api/mentor/suggestions
```

## Competitor Analysis

### Analyze Competitors
```http
POST /api/competitor/analyze
Content-Type: application/json

{
  "industry": "SaaS",
  "competitors": ["Competitor A", "Competitor B"]
}
```

### Get Market Trends
```http
GET /api/competitor/market-trends
```

## Co-Founder Matching

### Find Matches
```http
POST /api/cofounder/match
Content-Type: application/json

{
  "skills": ["Full-Stack", "Marketing"],
  "experience": "5 years",
  "industry": "SaaS"
}
```

### Get Personas
```http
GET /api/cofounder/personas
```

## Analytics

### Get Overview
```http
GET /api/analytics/overview
```

### Get Metrics
```http
GET /api/analytics/metrics
```

## Startups

### List Startups
```http
GET /api/startups
```

### Create Startup
```http
POST /api/startups
Content-Type: application/json

{
  "name": "My Startup",
  "industry": "SaaS",
  "stage": "Seed",
  "funding": 500000,
  "team": 5
}
```

### Get Startup
```http
GET /api/startups/:id
```

### Update Startup
```http
PUT /api/startups/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "funding": 1000000
}
```

### Delete Startup
```http
DELETE /api/startups/:id
```

## Health Check

```http
GET /api/health
```

## Response Formats

### Success Response
```json
{
  "data": {},
  "message": "Success"
}
```

### Error Response
```json
{
  "error": "Error message"
}
```
