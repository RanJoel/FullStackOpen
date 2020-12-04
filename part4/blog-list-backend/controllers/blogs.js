const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: "title or url is missing" });
  }

  const savedBlog = await blog.save();
  return response.status(201).json(savedBlog.toJSON());
});

blogsRouter.put("/:id", async (request, response) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: "title or url is missing" });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
    }
  );

  if (!updatedBlog) {
    return response.status(400).end();
  }

  return response.status(200).json(updatedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findOne({ _id: request.params.id });

  if (!blog) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  await Blog.findByIdAndRemove(request.params.id);

  return response.status(204).end();
});

module.exports = blogsRouter;
