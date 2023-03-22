import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog.js";

describe("Blog component", () => {
  const blog = {
    title: "Example Blog Title",
    author: "John Doe",
    url: "https://example.com",
    likes: 10,
  };

  beforeEach(() => {
    render(<Blog blog={blog} />);
  });

  test("renders blog title and author but not URL or likes by default", () => {
    const titleElement = screen.getByText(new RegExp(blog.title, "i"));
    expect(titleElement).toBeInTheDocument();

    const authorElement = screen.getByText(new RegExp(blog.author, "i"));
    expect(authorElement).toBeInTheDocument();

    const urlElement = screen.queryByText(blog.url);
    expect(urlElement).toBeNull();

    const likesElement = screen.queryByText(`${blog.likes} likes`);
    expect(likesElement).toBeNull();
  });
});
