import request from "supertest";
import { createTestUserAndLogin } from "./testUtils";

const apiUrl = "http://localhost:3001";

let token: string;

beforeAll(async () => {
    token = await createTestUserAndLogin();
});

describe('Website Creation API', () => {
    it('should return 400 for invalid website creation body format', async () => {
        const res = await request(apiUrl)
            .post('/website/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Website',
                url: 'invalid-url'
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('message');
    });

    it('should create a new website', async () => {
        const res = await request(apiUrl)
            .post('/website/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Test Website',
                url: 'http://example.com'
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('message', 'Website created successfully');
    });

    it.todo('should return 400 if website already exists')
//         , async () => {
//         const res = await request(apiUrl)
//             .post('/website/create')
//             .set('Authorization', `Bearer ${token}`)
//             .send({
//                 name: 'Test Website',
//                 url: 'http://example.com'
//             });

//         expect(res.status).toBe(500);
//         expect(res.body).toHaveProperty('message', 'Website already exists');
//     });
})

afterAll(async () => {
    // await request(apiUrl)
    //     .post('/admin/website-delete')
    //     .send({
    //         url: 'http://example.com'
    //     });
    try {
        const { PrismaClient } = await import('@prisma/client');
        const prisma = new PrismaClient();

        await prisma.website.deleteMany({
            where: { url: 'http://example.com' }
        });

        await prisma.$disconnect();
    } catch (error) {
        // best-effort cleanup; don't fail the test suite if DB cleanup is unavailable
        // eslint-disable-next-line no-console
        console.error('Test cleanup error:', error);
    }
})