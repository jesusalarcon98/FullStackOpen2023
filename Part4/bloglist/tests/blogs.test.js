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

  expect(initialBlogs[0].id).toBeDefined();
});

test("a note is added", async () => {
  const newBlog = {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const initialBlogs = await helper.blogsInDb();
  expect(initialBlogs).toHaveLength(helper.initialBlogs.length + 1);

  const contents = initialBlogs.map((r) => r.author);
  expect(contents).toContain("Robert C. Martin");
});

afterAll(() => {
  mongoose.connection.close();
});
