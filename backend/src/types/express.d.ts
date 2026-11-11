export type UserRole = "admin" | "agent" | "buyer";

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  agentId?: string;
}

declare global {
  namespace Express {
    interface Request {
      validatedQuery?: unknown;
      validatedParams?: unknown;
      user?: AuthUser;
    }
  }
}
