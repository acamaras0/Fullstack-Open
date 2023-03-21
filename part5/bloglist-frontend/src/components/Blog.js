import React, { useState } from "react";

const Blog = ({ blog }) => {
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
            {blog.likes} <button>like</button>
          </span>
          <br />
          <span>{blog.user?.username}</span>
        </div>
      ) : null}
    </div>
  );
};
export default Blog;
