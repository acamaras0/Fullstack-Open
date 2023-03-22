import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import Blog from "../components/Blog.js";

describe("Blog component", () => {
  const blog = {
    title: "Example Blog Title",
    author: "John Doe",
    url: "https://example.com",
    likes: 10,
    user: { username: "testuser" },
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

  test('clicking the "view" button shows the blog URL and likes', () => {
    const component = render(<Blog blog={blog} />);

    const buttons = component.queryAllByRole("button", { name: "view" });
    fireEvent.click(buttons[1]);

    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(blog.likes);
  });

  test("clicking the like button twice will trigger the addLike function twice", () => {
    const mockHandler = jest.fn();

    const component = render(
      <Blog
        blog={blog}
        handleLike={mockHandler}
        setReload={() => {}}
        reload={false}
      />
    );

    const buttons = component.queryAllByRole("button", { name: "view" });
    fireEvent.click(buttons[1]);

    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
