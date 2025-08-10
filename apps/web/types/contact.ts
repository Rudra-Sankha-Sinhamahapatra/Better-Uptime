import { queryTypes } from "@/utils/data/contactData";
import { JSX } from "react";

export type SessionUser = {
    id: string;
    name: string | null;
    email: string;
    image?: string | null;
    emailVerified?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export type QueryType = typeof queryTypes[number];

export interface ContactMethod {
  title: string;
  email: string;
}

export interface SupportHour {
  days: string;
  hours: string;
}

export interface SocialMediaLink {
  name: string;
  url: string;
  icon: JSX.Element;
}

export interface QuickSupportContent {
  liveChatText: string;
  liveChatButton: string;
  docsText: string;
  docsButton: string;
}

export interface ContactSection {
  id: string;
  title: string;
  icon: any;
  content: ContactMethod[] | SupportHour[] | SocialMediaLink[] | QuickSupportContent;
  note?: string;
}