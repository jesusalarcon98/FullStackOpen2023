const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  });

  if (!body.title || !body.url) {
    return response.status(400).json({ error: "title and url are required" });
  }
  try {
    const blogSaved = await blog.save();
    response.json(blogSaved);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
