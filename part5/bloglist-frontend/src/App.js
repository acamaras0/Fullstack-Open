import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Form from "./components/Form";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

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

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? (
        <Form setUser={setUser} />
      ) : (
        <>
          <p>Logged in as {user.username}.</p>
          <button onClick={handleLogout}>Log out</button>
        </>
      )}
      {user ? blogs.map((blog) => <Blog key={blog.id} blog={blog} />) : null}
    </div>
  );
};

export default App;
