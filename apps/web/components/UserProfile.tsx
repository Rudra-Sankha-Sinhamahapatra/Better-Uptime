"use client";

import { UserProfileProps } from "@/types/userProfile";
import { useSession } from "@/context/session-context";

export function UserProfile({children}: UserProfileProps) {
    const { session, loading } = useSession();

    if (loading) {
        return <div className="animate-pulse bg-gray-700 rounded h-8 w-20"></div>;
    }

    return <>{children?.(session)}</>;
}