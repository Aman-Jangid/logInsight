import app from "../src/index";

import { describe, it, expect } from "@jest/globals";

const request = require("supertest");
describe("POST /register", () => {
  it("should create a new user", async () => {
    const res = await request(app.callback())
      .post("/register")
      .send({
        name: "John Doe",
        email: `john${Date.now()}@test.com`, // unique email
        password: "secure123",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.name).toBe("John Doe");
    expect(res.body.email).toMatch(/@test\.com$/);
  });
});
