const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  return response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: "title or url is missing" });
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({ title, author, url, likes, user: user._id });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

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
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  const blog = await Blog.findOne({ _id: request.params.id });
  console.log(decodedToken);
  if (!request.token || decodedToken.id.toString() !== blog.user.toString()) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  await Blog.findByIdAndRemove(request.params.id);

  return response.status(204).end();
});

module.exports = blogsRouter;
