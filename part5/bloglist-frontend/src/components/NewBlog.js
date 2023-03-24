import { useEffect, useState } from "react";

const NewBlog = ({ handleVisibility, addBlog }) => {
  const [newBlog, setNewBlog] = useState({});
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addNewBlog = async (e) => {
    e.preventDefault();
    setNewBlog({ title: title, author: author, url: url });
  };

  useEffect(() => {
    if (newBlog.title) {
      addBlog(newBlog);
    }
  }, [newBlog]);

  return (
    <>
      <form
        onSubmit={(e) => addNewBlog(e)}
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
        <button type="submit" id="create-button">
          Add
        </button>
        <br />
        <button type="button" onClick={handleVisibility}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default NewBlog;
