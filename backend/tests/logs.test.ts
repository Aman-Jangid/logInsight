import { describe, it, beforeAll, afterAll, expect } from "@jest/globals";
const request = require("supertest");
import app from "../src/server";
import knex from "knex";
import knexConfigForEnv from "../knexfile";
import * as jwt from "jsonwebtoken";

const logs = require("../data/sample/logs.json");

const knexInstance = knex(knexConfigForEnv);

// Mock JWT token
const mockUserId = "550e8400-e29b-41d4-a716-446655440000";
const mockToken = jwt.sign(
  { id: mockUserId, email: "user@example.com" },
  process.env.JWT_SECRET || "defaultSecret",
  { expiresIn: "1h" }
);

describe("Log DB Testing", () => {
  beforeAll(async () => {
    await knexInstance("logs").del();

    await knexInstance("users").insert({
      id: mockUserId,
      name: "Test User",
      email: "user@example.com",
      password_hash: "hashedpassword",
      is_verified: true,
      created_at: new Date(),
      updated_at: new Date(),
    });
  });

  afterAll(async () => {
    // Clean up the database
    await knexInstance("logs").del();
    await knexInstance("users").del();
    await knexInstance.destroy();
  });

  it("should store a new log in the database", async () => {
    const res = await request(app.callback())
      .post("/api/v1/logs")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        ...logs[0],
        userId: mockUserId,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("timestamp");
    expect(res.body).toHaveProperty("level");
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("source");
    expect(res.body).toHaveProperty("type");
    expect(res.body).toHaveProperty("metadata");
    expect(res.body).toHaveProperty("environment");
    expect(res.body).toHaveProperty("userId");
    expect(res.body).toHaveProperty("created_at");
    expect(res.body).toHaveProperty("updated_at");
    expect(res.body).toHaveProperty("deleted_at", null);
  });

  it("should get all stored logs from the database", async () => {
    const res = await request(app.callback())
      .get("/api/v1/logs")
      .set("Authorization", `Bearer ${mockToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toMatchObject({
      id: expect.any(String),
      timestamp: expect.any(String),
      level: expect.any(String),
      message: expect.any(String),
      source: expect.any(String),
      type: expect.any(String),
      metadata: expect.any(Object),
      environment: expect.any(String),
      userId: expect.any(String),
      created_at: expect.any(String),
      updated_at: expect.any(String),
      deleted_at: null,
    });
  });

  it("should fetch a log using its ID", async () => {
    const logToInsert = logs[1];
    const insertedLog = await request(app.callback())
      .post("/api/v1/logs")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        ...logToInsert,
        userId: mockUserId,
      });

    const logId = insertedLog.body.id;

    const res = await request(app.callback())
      .get(`/api/v1/logs/${logId}`)
      .set("Authorization", `Bearer ${mockToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: logId,
      timestamp: expect.any(String),
      level: expect.any(String),
      message: expect.any(String),
      source: expect.any(String),
      type: expect.any(String),
      metadata: expect.any(Object),
      environment: expect.any(String),
      userId: expect.any(String),
      created_at: expect.any(String),
      updated_at: expect.any(String),
      deleted_at: null,
    });
  });

  it("should soft delete a log using its ID", async () => {
    const logToInsert = logs[2];
    const insertedLog = await request(app.callback())
      .post("/api/v1/logs")
      .set("Authorization", `Bearer ${mockToken}`)
      .send({
        ...logToInsert,
        userId: mockUserId,
      });

    const logId = insertedLog.body.id;

    const res = await request(app.callback())
      .delete(`/api/v1/logs/${logId}`)
      .set("Authorization", `Bearer ${mockToken}`);

    expect(res.status).toBe(200);

    const deletedLog = await knexInstance("logs").where({ id: logId }).first();
    expect(deletedLog.deleted_at).not.toBeNull();
  });

  it("should include soft-deleted logs in the logs table", async () => {
    const logsInDb = await knexInstance("logs").select("*");
    expect(logsInDb).toBeInstanceOf(Array);
    expect(logsInDb.some((log) => log.deleted_at !== null)).toBe(true);
  });
});
