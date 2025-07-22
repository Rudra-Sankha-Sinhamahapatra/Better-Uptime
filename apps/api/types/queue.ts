export interface WebsiteMonitoringMessage {
    websiteId: string;
    url: string;
    name: string;
    timestamp?: number;
}

export interface ContactFormMessage {
    type: 'contact_form';
    data: {
        name: string;
        email: string;
        queryType: string;
        query: string;
        isLoggedIn: boolean;
        userId: string | null;
        submittedAt: string;
    };
}

export type QueueMessage = WebsiteMonitoringMessage | ContactFormMessage;