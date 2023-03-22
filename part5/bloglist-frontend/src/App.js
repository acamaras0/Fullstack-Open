import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Form from "./components/Form";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reload, setReload] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [reload, setReload]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("logged");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("logged");
    window.localStorage.clear();
    window.location.reload();
  };

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLike = async (id, newObject) => {
    await blogService.addLike(id, newObject);
    setReload(!reload);
  };

  const addBlog = async (newBlog) => {
    try {
      await blogService.addBlog(newBlog);
      setMessage(`a new blog added`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  blogs.sort((a, b) => b.likes - a.likes);
  return (
    <div>
      <h2>blogs</h2>
      {user === null ? (
        <Form setUser={setUser} />
      ) : (
        <>
          <div style={{ marginBottom: "5px" }}>
            <span>Logged in as {user.username}. </span>
            <button onClick={() => handleLogout()}>Log out</button>
            <div>
              {message ? (
                <span style={{ color: "green", fontSize: "25px" }}>
                  {message}
                </span>
              ) : (
                <span style={{ color: "red", fontSize: "25px" }}>{error}</span>
              )}
            </div>
          </div>
          <div>
            {isVisible ? (
              <NewBlog handleVisibility={handleVisibility} addBlog={addBlog} />
            ) : (
              <button onClick={() => handleVisibility()}>New blog</button>
            )}
          </div>
          <br />
        </>
      )}
      {user
        ? blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              setReload={setReload}
              reload={reload}
              handleLike={handleLike}
            />
          ))
        : null}
    </div>
  );
};

export default App;
