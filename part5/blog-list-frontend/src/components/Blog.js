import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setMessage, setBlogs, user }) => {
  const [showFullBlog, setShowFullBlog] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const toggleVisibility = () => {
    setShowFullBlog(!showFullBlog);
  };

  //const hideWhenVisible = { display: showFullBlog ? "none" : "" };
  const showWhenVisible = { display: showFullBlog ? "" : "none" };
  const showText = showFullBlog ? "view" : "show";

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const increaseLikes = async () => {
    const newBlog = {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    const returnedBlog = await blogService.update(blog.id, newBlog);
    setLikes(returnedBlog.likes);
  };

  const handleDeleteBlog = async (blog) => {
    if (window.confirm(`Are you sure you want to delete blog "${blog.title}"?`))
      try {
        await blogService.remove(blog.id);
        setBlogs(await blogService.getAll());
        setMessage({
          text: `Blog "${blog.title}" successfully removed`,
          type: "notify",
        });
        setTimeout(() => {
          setMessage({});
        }, 5000);
      } catch (exception) {
        setMessage({
          text: exception,
          type: "error",
        });
        setTimeout(() => {
          setMessage({});
        }, 5000);
      }
  };

  const showDeleteIfValidUser = () => {
    if (blog.user.id.toString() === user.id.toString()) {
      return (
        <div>
          <button type="button" onClick={() => handleDeleteBlog(blog)}>
            Delete
          </button>
        </div>
      );
    }

    return null;
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        <button type="button" onClick={toggleVisibility}>
          {showText}
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>URL: {blog.url}</div>
        <div>
          Likes: {likes}{" "}
          <button type="button" onClick={increaseLikes}>
            like
          </button>
        </div>
        <div>Created by: {blog.user.name}</div>
        {showDeleteIfValidUser()}
      </div>
    </div>
  );
};

export default Blog;
