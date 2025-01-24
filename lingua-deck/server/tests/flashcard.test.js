import supertest from "supertest";
import { web } from "../src/apps/web.js";
import { createTestUser, removeTodayTestFlashcard, removeTestUser, createTestFlashcard, getTestFlashcard } from "./test-util";

describe("POST /api/flashcards", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTodayTestFlashcard();
    await removeTestUser();
  });

  it("should create a new flashcard successfully", async () => {
    const result = await supertest(web).post("/api/flashcards").set("Authorization", "test").send({
      term: "apple, basket",
      definition: "A definition of a term.",
      level: "beginner",
      category: "fruit basket",
      part_of_speech: "noun",
      example_sentence: "This is an example sentence.",
    });

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.term).toBe("apple, basket");
    expect(result.body.data.definition).toBe("A definition of a term.");
    expect(result.body.data.level).toBe("beginner");
    expect(result.body.data.category).toBe("fruit basket");
    expect(result.body.data.part_of_speech).toBe("noun");
    expect(result.body.data.example_sentence).toBe("This is an example sentence.");
  });

  it("should error when term contains invalid characters", async () => {
    const result = await supertest(web).post("/api/flashcards").set("Authorization", "test").send({
      term: "apple123, basket",
      definition: "A definition of a term.",
      level: "beginner",
      category: "fruit basket",
      part_of_speech: "noun",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should error when definition exceeds maximum length", async () => {
    const result = await supertest(web)
      .post("/api/flashcards")
      .set("Authorization", "test")
      .send({
        term: "apple",
        definition: "a".repeat(101),
        level: "beginner",
        category: "fruit basket",
        part_of_speech: "noun",
      });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should error when level is invalid", async () => {
    const result = await supertest(web).post("/api/flashcards").set("Authorization", "test").send({
      term: "apple",
      definition: "A definition of a term.",
      level: "expert",
      category: "fruit basket",
      part_of_speech: "noun",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should error when category contains invalid characters", async () => {
    const result = await supertest(web).post("/api/flashcards").set("Authorization", "test").send({
      term: "apple",
      definition: "A definition of a term.",
      level: "beginner",
      category: "fruit123 basket",
      part_of_speech: "noun",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should error when category exceeds 2 words and more than 15 characters", async () => {
    const result = await supertest(web).post("/api/flashcards").set("Authorization", "test").send({
      term: "apple",
      definition: "A definition of a term.",
      level: "beginner",
      category: "super long category",
      part_of_speech: "noun",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should error when part of speech is invalid", async () => {
    const result = await supertest(web).post("/api/flashcards").set("Authorization", "test").send({
      term: "apple",
      definition: "A definition of a term.",
      level: "beginner",
      category: "fruit basket",
      part_of_speech: "random",
    });

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });

  it("should return 200 when example sentence is not provided", async () => {
    const result = await supertest(web).post("/api/flashcards").set("Authorization", "test").send({
      term: "apple",
      definition: "A definition of a term.",
      level: "beginner",
      category: "fruit basket",
      part_of_speech: "noun",
    });

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.example_sentence).toBeNull();
  });
});

describe("GET /api/flashcard/:card_id", function () {
  beforeEach(async () => {
    await createTestFlashcard();
  });

  afterEach(async () => {
    await removeTodayTestFlashcard();
    await removeTestUser();
  });

  it("should can get flashcard", async () => {
    const testFlashcard = await getTestFlashcard();
    const result = await supertest(web).get("/api/flashcards/" + testFlashcard.card_id);

    expect(result.status).toBe(200);
    expect(result.body.data).toBeDefined();
  });

  it("should error if card id not valid", async () => {
    const result = await supertest(web).get("/api/flashcards/notanid");

    expect(result.status).toBe(400);
    expect(result.body.error).toBeDefined();
  });
});
