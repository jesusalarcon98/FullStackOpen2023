const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("../tests/test_materials");

const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("returned if ID property exists", async () => {
  const initialBlogs = await helper.blogsInDb();

  console.log("blogs", initialBlogs);

  expect(initialBlogs[0].id).toBeDefined();
});

afterAll(() => {
  mongoose.connection.close();
});
