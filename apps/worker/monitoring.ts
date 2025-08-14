import axios from "axios";
import https from "https"
import { WebsiteStatus } from "@repo/db/client";

export const checkWebsite = async (url: string) => {
    const startTime = Date.now();    
    console.log(`🚀 [${new Date().toISOString()}] Starting check for ${url}`);
    try {
             console.log(`📡 [${new Date().toISOString()}] Making axios request to ${url}`);
        const response = await axios.get(url, {
            timeout: 20000, // 10 seconds timeout
            maxRedirects: 5, // redirects
            validateStatus: null, //  all status codes to be processed
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                 'Connection': 'close',
            },
             httpsAgent: new https.Agent({
                rejectUnauthorized: false, // Ignore SSL certificate errors
            }),
               httpAgent: false,
        });

        console.log(`✅ Got response from ${url}: ${response.status}`);
        const result = {
            responseTimeMs: Date.now() - startTime,
            status: response.status >= 200 && response.status < 400
                ? WebsiteStatus.Up
                : WebsiteStatus.Down,
            responseStatus: response.status,
            statusText: response.statusText,
            contentType: response.headers['content-type']
        };
        console.log(`🎉 Check result for ${url}:`, result);

        return result;
    } catch (error: any) {
        const errorResult = {
            responseTimeMs: Date.now() - startTime,
            status: WebsiteStatus.Down,
            responseStatus: error.response?.status,
            statusText: error.response?.statusText || error.message,
            error: error.code || 'UNKNOWN_ERROR',
            errorExact: error
        };
        return errorResult;
    }
}