"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { authClient } from "@/lib/auth-client"
import { Session } from "@/types/session"

interface SessionContextType {
    session: Session | null;
    loading: boolean;
    refreshSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchSession = async () => {
        try {
            const response = await authClient.getSession();
            if ('data' in response && response.data) {
                setSession(response.data as Session);
            } else {
                setSession(null);
            }
        } catch (error) {
            console.error('Session fetch error:', error);
            setSession(null);
        } finally {
            setLoading(false);
        }
    };

    const refreshSession = async () => {
        setLoading(true);
        await fetchSession();
    }

    useEffect(() => {
        fetchSession();
    },[]);

    return (
        <SessionContext.Provider value={{ session, loading, refreshSession }}>
          {children}
        </SessionContext.Provider>
      );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
      throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
  }