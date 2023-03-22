import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import NewBlog from "../components/NewBlog.js";

describe("New blog form", () => {
  test("calls addBlog with the right details when a new blog is created", () => {
    const mockAddBlog = jest.fn();
    const { getByLabelText, getAllByText } = render(
      <NewBlog handleVisibility={() => {}} addBlog={mockAddBlog} />
    );

    const titleInput = getByLabelText(/title/i);
    const authorInput = getByLabelText(/author/i);
    const urlInput = getByLabelText(/url/i);
    const addButton = getAllByText(/Add/i);

    const newBlog = {
      title: "Test Blog Title",
      author: "Test Blog Author",
      url: "http://www.testblogurl.com",
    };

    fireEvent.change(titleInput, { target: { value: newBlog.title } });
    fireEvent.change(authorInput, { target: { value: newBlog.author } });
    fireEvent.change(urlInput, { target: { value: newBlog.url } });
    fireEvent.click(addButton[1]);

    expect(mockAddBlog).toHaveBeenCalledTimes(1);
    expect(mockAddBlog).toHaveBeenCalledWith(newBlog);
  });
});
