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

test("a blog is added", async () => {
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
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const initialBlogs = await helper.blogsInDb();
  expect(initialBlogs).toHaveLength(helper.initialBlogs.length + 1);

  const contents = initialBlogs.map((r) => r.author);
  expect(contents).toContain("Robert C. Martin");
});

test("return 0 if likes doesnt exist", async () => {
  const newBlog = {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const createdBlog = response.body;

  expect(createdBlog.likes).toBe(0);
});

test("return 400 if title or url doesnt exist", async () => {
  const newBlog = {
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 10,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test("Deletion of a blog", async () => {
  const startBlogs = await helper.blogsInDb();
  console.log("iniciales", startBlogs);
  const blogDelete = startBlogs[0];

  console.log("blog", blogDelete);

  await api.delete(`/api/blogs/${blogDelete.id}`).expect(204);

  const blogsEnd = await helper.blogsInDb();

  expect(blogsEnd).toHaveLength(helper.initialBlogs.length - 1);
  const content = blogsEnd.map((r) => r.author);
  expect(content).not.toContain(blogDelete.author);
});

afterAll(() => {
  mongoose.connection.close();
});
