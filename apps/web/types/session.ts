export type SessionUser = {
    id: string;
    name: string | null;
    email: string;
    image: string | null | undefined;
  };
  
  export type SessionData = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    expiresAt: Date;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
  
  export type Session = {
    user: SessionUser;
    session: SessionData;
  };
  