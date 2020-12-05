import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Togglable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort(function (a, b) {
        return b.likes - a.likes;
      });
      setBlogs(blogs);
    });
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
        text: "Login Successful",
        type: "notify",
      });
      setTimeout(() => {
        setMessage({});
      }, 5000);
    } catch (exception) {
      setMessage({
        text: "Wrong username or password",
        type: "error",
      });
      setTimeout(() => {
        setMessage({});
      }, 5000);
    }
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
      <Notification message={message.text} type={message.type} />
      <Togglable buttonLabel="Create a new blog">
        <BlogForm setMessage={setMessage} setBlogs={setBlogs} blogs={blogs} />
      </Togglable>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          setMessage={setMessage}
          setBlogs={setBlogs}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
