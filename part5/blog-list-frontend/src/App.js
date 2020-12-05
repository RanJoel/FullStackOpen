import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setMessage({
        text: `Login Successful`,
        type: "notify",
      });
      setTimeout(() => {
        setMessage({});
      }, 5000);
    } catch (exception) {
      setMessage({
        text: `Wrong username or password`,
        type: "error",
      });
      setTimeout(() => {
        setMessage({});
      }, 5000);
    }
  };

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

  if (user === null) {
    return (
      <div>
        <Notification message={message.text} type={message.type} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <p>{user.name} logged-in</p>
      <button
        type="submit"
        onClick={() => window.localStorage.removeItem("loggedBlogappUser")}
      >
        logout
      </button>
      <h2>blogs</h2>
      <Notification message={message.text} type={message.type} />
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          URL:
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">save</button>
      </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
