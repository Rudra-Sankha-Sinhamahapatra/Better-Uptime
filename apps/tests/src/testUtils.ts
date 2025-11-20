import request from "supertest";
const apiUrl = "http://localhost:3001";

export async function createTestUserAndLogin() {
  const uniqueEmail = `user${Date.now()}@example.com`;

  await request(apiUrl).post("/user/signup").send({
    email: uniqueEmail,
    password: "validPassword123",
  });

  const signinRes = await request(apiUrl).post("/user/signin").send({
    email: uniqueEmail,
    password: "validPassword123",
  });

  return signinRes.body.token;
}