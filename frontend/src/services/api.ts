// API Service Layer for Backend Integration
// This file provides a centralized way to make API calls

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Generic API request function
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_URL}${endpoint}`, config);
  return handleResponse<T>(response);
}

// API methods
export const api = {
  // GET request
  get: <T>(endpoint: string) => request<T>(endpoint, { method: 'GET' }),

  // POST request
  post: <T>(endpoint: string, data?: any) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // PUT request
  put: <T>(endpoint: string, data?: any) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // DELETE request
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};

// Authentication API
export const authAPI = {
  login: (username: string, email: string, password: string) =>
    api.post<{ token: string; user: any }>('/auth/login', { username, email, password }),

  register: (username: string, email: string, password: string) =>
    api.post<{ token: string; user: any }>('/auth/register', { username, email, password }),

  logout: () => api.post('/auth/logout'),

  getCurrentUser: () => api.get<any>('/auth/me'),
};

// Dashboard API
export const dashboardAPI = {
  getRecommendations: (data: {
    category: string;
    budget: string;
    experience: string;
    idea: string;
  }) => api.post<any[]>('/recommendations', data),

  analyzeIdea: (idea: string) => api.post<any>('/analyze-idea', { idea }),

  getCompetitors: (idea: string) => api.post<any[]>('/competitors', { idea }),
};

// Financial API
export const financialAPI = {
  calculateRunway: (data: {
    initialCapital: number;
    monthlyBurn: number;
    teamSize: number;
  }) => api.post<any>('/financial/calculate-runway', data),

  getScenarios: (data: any) => api.post<any>('/financial/scenarios', data),

  exportReport: (data: any) => api.post<Blob>('/financial/export', data),
};

// Risk Assessment API
export const riskAPI = {
  assessRisk: (ideaId: string) => api.get<any>(`/risk-assessment/${ideaId}`),

  calculateRisk: (data: any) => api.post<any>('/risk-assessment/calculate', data),
};

// Co-Founder API
export const cofounderAPI = {
  findMatches: (profile: any) => api.post<any[]>('/cofounder/matches', profile),

  getProfile: (userId: string) => api.get<any>(`/cofounder/profile/${userId}`),

  calculateCompatibility: (profile1: any, profile2: any) =>
    api.post<any>('/cofounder/compatibility', { profile1, profile2 }),
};

// AI Mentor API
export const aiMentorAPI = {
  sendMessage: (message: string, conversationId?: string) =>
    api.post<{ response: string; conversationId: string }>('/ai-mentor/chat', {
      message,
      conversationId,
    }),

  getHistory: (conversationId: string) =>
    api.get<any[]>(`/ai-mentor/history/${conversationId}`),

  clearConversation: (conversationId: string) =>
    api.delete(`/ai-mentor/conversation/${conversationId}`),
};

// User Settings API
export const userAPI = {
  getProfile: () => api.get<any>('/user/profile'),

  updateProfile: (data: any) => api.put<any>('/user/profile', data),

  changePassword: (currentPassword: string, newPassword: string) =>
    api.put('/user/password', { currentPassword, newPassword }),

  getSessions: () => api.get<any[]>('/user/sessions'),

  revokeSession: (sessionId: string) => api.delete(`/user/session/${sessionId}`),

  updateNotifications: (settings: any) =>
    api.put('/user/notifications', settings),
};

// Explorer API
export const explorerAPI = {
  getCategoryIdeas: (categoryId: string) =>
    api.get<any[]>(`/explorer/categories/${categoryId}/ideas`),

  getCategories: () => api.get<any[]>('/explorer/categories'),
};

export default api;
