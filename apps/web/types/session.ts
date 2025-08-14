type SessionUser = {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
}

type SessionData = {
 token: string;
};

export type Session = {
    user: SessionUser,
    session: SessionData
}