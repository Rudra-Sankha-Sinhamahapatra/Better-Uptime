export interface ContactFormEmailData {
    name: string;
    email: string;
    queryType: string;
    query: string;
    isLoggedIn: boolean;
    userId: string | null;
    originalName?: string | null;
    originalEmail?: string | null;
    submittedAt: string;
}
