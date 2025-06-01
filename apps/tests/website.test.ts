import { describe, it, expect } from "bun:test";
import axios from "axios";


let BASE_URL = "http://localhost:3001";

describe("Website gets created", () => {
    it("Website not created if url and name is not present", async () => {
        try {
            await axios.post(`${BASE_URL}/website`, {});
   
            expect(false).toBe(true); 
        } catch (error: any) {
            expect(error.response.status).toBe(400);
        }
    

    })

    it("Website is created if url is present", async () => {
        const response = await axios.post(`${BASE_URL}/website`, {
            name: "Test Website",
            url: "https://google.com"
        });
        expect(response.data.id).not.toBeNull();

    })

    it("fetching all websites", async () => {
        const response = await axios.get(`${BASE_URL}/website`);
        if (Array.isArray(response.data)) {
            expect(response.data.length).toBeGreaterThan(0);
        } else {
            expect(response.data).toEqual({});
        }
    })


    it("fetching a website by id that doesnt exist", async () => {
        try {
            await axios.get(`${BASE_URL}/website/99999999999`);
            expect(false).toBe(true);
        } catch (error: any) {
            expect(error.response.status).toBe(404);
        }
    })
    
})