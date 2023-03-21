import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setReload, reload }) => {
  const [isVisible, setIsVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const addLike = async (id, newObject) => {
    await blogService.addLike(id, newObject);
    setReload(!reload);
  };

  const handleRemove = async (id) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.removeBlog(id);
    }
    setReload(!reload);
  };

  return (
    <div style={blogStyle}>
      <span>
        {blog.title} {blog.author}
      </span>
      <button onClick={() => handleVisibility()}>
        {isVisible ? "hide" : "view"}
      </button>
      {isVisible ? (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <br />
          <span>
            {blog.likes}{" "}
            <button onClick={() => addLike(blog.id, { likes: blog.likes + 1 })}>
              like
            </button>
          </span>
          <br />
          <span>{blog.user?.username}</span>
          <button onClick={() => handleRemove(blog.id)}>remove</button>
        </div>
      ) : null}
    </div>
  );
};
export default Blog;
