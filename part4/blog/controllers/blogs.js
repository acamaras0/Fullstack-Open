const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  if (!blog.likes) {
    blog.likes = 0;
  }
  if(!blog.title || !blog.url) {
    return response.status(400).end();
  }
  const res = await blog.save();
  response.status(201).json(res);
});

module.exports = blogRouter;
