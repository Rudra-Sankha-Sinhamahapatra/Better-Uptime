import { Session } from "./session"
import React from "react";

export type UserProfileProps = {
   children?: (session: Session | null) => React.ReactNode;
}