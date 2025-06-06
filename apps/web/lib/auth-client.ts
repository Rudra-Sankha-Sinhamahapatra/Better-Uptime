import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL as string,
    onSignOut: () => {
        window.location.replace("/signin");
    }
});