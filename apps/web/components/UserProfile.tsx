"use client";

import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Session } from "@/types/session";
import { UserProfileProps } from "@/types/userProfile";

export function UserProfile({children}: UserProfileProps) {
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const response = await authClient.getSession();
            if ('data' in response && response.data) {
                setSession(response.data as Session);
            } else {
                setSession(null);
            }
        };
        
        fetchSession();
    }, []);

    return <>{children?.(session)}</>;
}