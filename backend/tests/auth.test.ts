import app from "../src/server";
import { describe, it, expect, beforeAll } from "@jest/globals";
const request = require("supertest");
import * as jwt from "jsonwebtoken";
import { UserModel } from "../src/models/User";

let user: any;
let validToken: string;

// Test suite for authentication
describe("Authentication Tests", () => {
  beforeAll(async () => {
    // Register a user for testing
    const email = `test${Date.now()}@test.com`;
    user = await UserModel.create({
      email,
      name: "Test User",
      password: "password123",
    });

    // Generate a valid token
    validToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
  });

  it("should register a user", async () => {
    const res = await request(app.callback())
      .post("/api/v1/auth/register")
      .send({
        email: `new${Date.now()}@test.com`,
        name: "New User",
        password: "password123",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("name", "New User");
    expect(res.body).toHaveProperty("is_verified", false);
  });

  it("should log in a user", async () => {
    const res = await request(app.callback()).post("/api/v1/auth/login").send({
      email: user.email,
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("id", user.id);
    expect(res.body).toHaveProperty("email", user.email);
  });

  it("should allow access to a protected route with a valid token", async () => {
    const res = await request(app.callback())
      .get("/api/v1/auth/profile")
      .set("Authorization", `Bearer ${validToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", user.id);
    expect(res.body).toHaveProperty("email", user.email);
    expect(res.body).toHaveProperty("name", "Test User");
    expect(res.body).toHaveProperty("is_verified", false);
  });

  it("should reject access to a protected route without a token", async () => {
    const res = await request(app.callback()).get("/api/v1/auth/profile");

    expect(res.status).toBe(401);
    console.log(res.body);
    expect(res.body).toHaveProperty("error", "No token provided");
  });

  it("should reject access to a protected route with an invalid token", async () => {
    const invalidToken = "invalid.token.here";
    const res = await request(app.callback())
      .get("/api/v1/auth/profile")
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid token");
  });

  it("should reject access to a protected route with an expired token", async () => {
    const expiredToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "0s" } // Expires immediately
    );

    const res = await request(app.callback())
      .get("/api/v1/auth/profile")
      .set("Authorization", `Bearer ${expiredToken}`);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Expired token");
  });
});
