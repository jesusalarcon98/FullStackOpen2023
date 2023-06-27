import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notifications";

import "./index.css";


const Create = ({ blogs, setBlogs, setErrorMessage }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const handleCreateBlog = (e) => {
    e.preventDefault();
    const blog = {
      title: title,
      author: author,
      url: url
    }

    blogService.CreateBlog(blog).then((createdBlog) => {
      setBlogs(blogs.concat(createdBlog));
      setErrorMessage({
        message: `a new blog ${createdBlog.title} by ${createdBlog.author} added`,
        type: "success",
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      setTitle("")
      setAuthor("")
      setUrl("")
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
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:
          <input type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)} />
          <br></br>
          Author:
          <input type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)} />
          <br></br>
          Url:
          <input type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}


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
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
    /*.catch((error) => {
      setErrorMessage({
        message: Nombre,
        type: "error",
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });  */
  };

  const logOut = () => {
    window.localStorage.removeItem("blogUser");
    setUser(null)
  };

  const showBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={errorMessage} />
        <p>
          {user.name} logged in -<button onClick={logOut}>Log out</button>
        </p>
        <Create blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} />

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} setErrorMessage={setErrorMessage} />
        ))}
      </div>
    );
  };

  return <div>{user === null ? loginForm() : showBlogs()}</div>;
};

export default App;