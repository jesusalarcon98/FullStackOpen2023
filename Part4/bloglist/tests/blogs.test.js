const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

test("length notes", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(2);
});

afterAll(() => {
  mongoose.connection.close();
});
