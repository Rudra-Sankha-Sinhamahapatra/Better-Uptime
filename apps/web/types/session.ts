type SessionUser = {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
}

export type Session = {
    user: SessionUser
}