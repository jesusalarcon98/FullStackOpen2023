const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.VITE_TOKEN_KEY);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: user._id,
  });

  if (!body.title || !body.url) {
    return response.status(400).json({ error: "title and url are required" });
  }
  try {
    const blogSaved = await blog.save();
    user.blogs = user.blogs.concat(blogSaved._id);
    await user.save();
    response.json(blogSaved);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  };

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

/*  
	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes? body.likes : 0 ,
	}
  
	await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
	response.json(blog)
  }) */

module.exports = blogsRouter;
