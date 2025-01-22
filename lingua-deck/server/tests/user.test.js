import supertest from "supertest";
import { web } from "../src/apps/web.js";
import { createTestUser, removeTestUser } from "./test-util.js";

describe("POST /api/users", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should can register new user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      email: "test@test.com",
      password: "mypassword",
      preferred_language: "en",
    });
    expect(result.status).toBe(201);
    expect(result.body.data.username).toBe("test");
  });

  it("should reject if no data is provided", async () => {
    const result = await supertest(web).post("/api/users").send({});
    expect(result.status).toBe(400);
    expect(result.body.error.message).toBe("data is required");
  });

  it("should reject if username is empty", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "",
    });
    expect(result.status).toBe(400);
    expect(result.body.error.message).toBe("username is not allowed to be empty");
  });

  it("should reject if unknown key is included in the request", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      email: "test@test.com",
      password: "mypassword",
      preferred_language: "en",
      random: "random",
    });
    expect(result.status).toBe(400);
    expect(result.body.error.message).toBe("random is not allowed");
  });

  it("should reject if username or email is already taken", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "test",
      email: "test@test.com",
      password: "mypassword",
      preferred_language: "en",
    });
    expect(result.status).toBe(201);
    expect(result.body.data.username).toBe("test");

    result = await supertest(web).post("/api/users").send({
      username: "test",
      email: "test@test.com",
      password: "mypassword",
      preferred_language: "en",
    });
    expect(result.status).toBe(409);
    expect(result.body.error.message).toBe("username or email not available");
  });
});

describe("POST /api/users/login", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can login", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "mypassword",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("test");
  });

  it("should return error for invalid credentials", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "mywrongpassword",
    });

    expect(result.status).toBe(401);
    expect(result.body.error.message).toBe("username or password wrong");
  });

  it("should return error if username is missing", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      password: "mywrongpassword",
    });

    expect(result.status).toBe(400);
    expect(result.body.error.message).toBe("username is required");
  });

  it("should reject if unknown key is included in the request", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "mypassword",
      random: "random",
    });

    expect(result.status).toBe(400);
    expect(result.body.error.message).toBe("random is not allowed");
  });

  it("should reject if no data is provided", async () => {
    const result = await supertest(web).post("/api/users/login").send({});

    expect(result.status).toBe(400);
    expect(result.body.error.message).toBe("username is required");
  });
});

describe("GET /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get current user", async () => {
    const result = await supertest(web).get("/api/users/current").set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@test.com");
    expect(result.body.data.preferred_language).toBe("en");
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(web).get("/api/users/current").set("Authorization", "wrong");

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });
});

describe("PATCH /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should update user successfully when all input data is valid", async () => {
    let result = await supertest(web).patch("/api/users/current").set("Authorization", "test").send({
      username: "testupdated",
      email: "testupdated@test.com",
      preferred_language: "fr",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("testupdated");
    expect(result.body.data.email).toBe("testupdated@test.com");
    expect(result.body.data.preferred_language).toBe("fr");

    result = await supertest(web).patch("/api/users/current").set("Authorization", "test").send({
      username: "test",
      email: "test@test.com",
      preferred_language: "en",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@test.com");
    expect(result.body.data.preferred_language).toBe("en");
  });

  it("should return unauthorized when authorization header is missing", async () => {
    const result = await supertest(web).patch("/api/users/current").send({
      username: "newtest",
      email: "newtest@test.com",
      preferred_language: "fr",
    });

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });

  it("should return unauthorized when authorization header is invalid", async () => {
    const result = await supertest(web).patch("/api/users/current").set("Authorization", "wrong").send({
      username: "newtest",
      email: "newtest@test.com",
      preferred_language: "fr",
    });

    expect(result.status).toBe(401);
    expect(result.body.error).toBeDefined();
  });

  it("should can update username only", async () => {
    let result = await supertest(web).patch("/api/users/current").set("Authorization", "test").send({
      username: "newtest",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("newtest");
    expect(result.body.data.email).toBe("test@test.com");
    expect(result.body.data.preferred_language).toBe("en");

    result = await supertest(web).patch("/api/users/current").set("Authorization", "test").send({
      username: "test",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@test.com");
    expect(result.body.data.preferred_language).toBe("en");
  });

  it("should can update email only", async () => {
    let result = await supertest(web).patch("/api/users/current").set("Authorization", "test").send({
      email: "newtest@test.com",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("newtest@test.com");
    expect(result.body.data.preferred_language).toBe("en");

    result = await supertest(web).patch("/api/users/current").set("Authorization", "test").send({
      email: "test@test.com",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@test.com");
    expect(result.body.data.preferred_language).toBe("en");
  });

  it("should return bad request when email is already registered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "jhon",
      email: "jhon@test.com",
      password: "jhon123",
      preferred_language: "en",
    });

    expect(result.status).toBe(201);
    expect(result.body.data.username).toBe("jhon");

    result = await supertest(web).patch("/api/users/current").set("Authorization", "test").send({
      email: "jhon@test.com",
    });

    expect(result.status).toBe(500);
    await removeTestUser("jhon");
  });

  it("should return bad request when username is already registered", async () => {
    let result = await supertest(web).post("/api/users").send({
      username: "jhon",
      email: "jhon@test.com",
      password: "jhon123",
      preferred_language: "en",
    });

    expect(result.status).toBe(201);
    expect(result.body.data.username).toBe("jhon");

    result = await supertest(web).patch("/api/users/current").set("Authorization", "test").send({
      username: "jhon",
    });

    expect(result.status).toBe(500);
    await removeTestUser("jhon");
  });
});
