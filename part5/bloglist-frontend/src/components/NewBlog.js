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
  }, [newBlog, author, title]);

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
        <label htmlFor="title">title: </label>
        <input
          required
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <label htmlFor="author">author: </label>
        <input
          required
          id="author"
          name="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <label htmlFor="url">url: </label>
        <input
          required
          id="url"
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
