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
