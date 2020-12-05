import React, { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ setMessage, setBlogs, blogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = { title, author, url };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setMessage({
        text: `A new blog ${title}! by ${author}`,
        type: "notify",
      });
      setTimeout(() => {
        setMessage({});
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
    });
  };

  return (
    <div>
      <h4>Create New Blog</h4>
      <form>
        <div>
          Title:{" "}
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:{" "}
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:{" "}
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="button" onClick={addBlog}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
