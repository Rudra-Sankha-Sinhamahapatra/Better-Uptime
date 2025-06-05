import axios from "axios";
import { WebsiteStatus } from "@repo/db/client";

export const checkWebsite = async(url:string) => {
const startTime = Date.now();

 
try {
    const response = await axios.get(url, {
        timeout: 30000 // 30 seconds timeout
    });

    return {
        responseTimeMs: Date.now() - startTime,
        status: response.status >= 200 && response.status < 400 
            ? WebsiteStatus.Up 
            : WebsiteStatus.Down
    };
} catch (error) {
    return {
        responseTimeMs: Date.now() - startTime,
        status: WebsiteStatus.Down
    };
}
}