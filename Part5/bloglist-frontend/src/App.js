import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notifications";
import Togglable from "./components/Togglable";
import CreateFormBlog from "./components/CreateBlogForm";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const loginForm = () => {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
            <br></br>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort((a, b) => { return b.likes - a.likes })));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("blogUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage({
        message: exception.response.data.error,
        type: "error",
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("blogUser");
    setUser(null)
  };

  const addBlog = (blogObject) => {
    blogService.CreateBlog(blogObject).then((returnedBlogs) => {
      setBlogs(blogs.concat(returnedBlogs));
      setErrorMessage({
        message: `a new blog ${returnedBlogs.title} by ${returnedBlogs.author} added`,
        type: "success",
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }).catch((error) => {
      setErrorMessage({
        message: error.response.data.error,
        type: "error",
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
  }

  const editLikes = (id) => {
    const blog = blogs.find((n) => n.id === id);
    const changedLikes = { ...blog, likes: blog.likes + 1 }
    blogService.EditBlog(id, changedLikes)
      .then((updatedLikes) => {
        setBlogs(blogs
          .map((blog) => blog.id !== id ? blog : updatedLikes)
          .sort((a, b) => b.likes - a.likes))

      })
    /*      const updatedBlogs = blogs.map((blog) => (blog.id !== id ? blog : updatedLikes));
 
        const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes);
        setBlogs(sortedBlogs);*/
  }

  const showBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} />

        <p>
          {user.name} logged in -<button onClick={logOut}>Log out</button>
        </p>
        <Togglable buttonLabel="New Blog">
          <CreateFormBlog createBlog={addBlog} />
        </Togglable>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} buttonLabel="View" editLikes={() => editLikes(blog.id)} />
        ))}
      </div>
    );
  };

  return <div>{user === null ? loginForm() : showBlogs()}</div>;
};

export default App;