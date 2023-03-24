import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setReload, reload, handleLike }) => {
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
      <button role="button" onClick={() => handleVisibility()}>
        {isVisible ? "hide" : "view"}
      </button>
      {isVisible ? (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <br />
          <span data-cy="likes">
            {blog.likes}{" "}
            <button
              onClick={() => handleLike(blog.id, { likes: blog.likes + 1 })}
            >
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
