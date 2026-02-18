export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
}

export interface Startup {
  id: number;
  name: string;
  industry: string;
  stage: string;
  funding: number;
  team: number;
  createdAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}
