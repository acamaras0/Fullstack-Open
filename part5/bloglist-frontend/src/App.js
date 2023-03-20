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

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? <Form setUser={setUser} /> : <p>Logged in as {user}</p>}
      {user ? blogs.map((blog) => <Blog key={blog.id} blog={blog} />) : null}
    </div>
  );
};

export default App;
