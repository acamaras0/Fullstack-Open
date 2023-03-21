import { useEffect, useState } from "react";
import blogService from "../services/blogs";

const NewBlog = ({ handleVisibility }) => {
  const [newBlog, setNewBlog] = useState({});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const addBlog = async (e) => {
    e.preventDefault();
    setNewBlog({ title: title, author: author, url: url });
  };

  useEffect(() => {
    if (newBlog.title) {
      const addNewBlog = async () => {
        try {
          await blogService.addBlog(newBlog);
          setMessage(`a new blog ${title} by ${author} added`);
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
      addNewBlog();
    }
  }, [newBlog]);

  return (
    <>
      {message ? (
        <span style={{ color: "green", fontSize: "25px" }}>{message}</span>
      ) : (
        <span style={{ color: "red", fontSize: "25px" }}>{error}</span>
      )}
      <form
        onSubmit={(e) => addBlog(e)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <h3>Add new blog</h3>
        <label>title: </label>
        <input
          required
          name="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <label>author: </label>
        <input
          required
          name="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <label>url: </label>
        <input
          required
          name="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <button type="submit">Add</button>
        <br />
        <button type="button" onClick={handleVisibility}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default NewBlog;
