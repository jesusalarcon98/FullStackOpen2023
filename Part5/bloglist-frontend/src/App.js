import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

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
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
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
      setErrorMessage("Wrong Crendentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logOut = () => {
    window.localStorage.removeItem("blogUser");
    setUser(null)
  };

  const showBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in -<button onClick={logOut}>Log out</button>
        </p>

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  };

  return <div>{user === null ? loginForm() : showBlogs()}</div>;
};

export default App;