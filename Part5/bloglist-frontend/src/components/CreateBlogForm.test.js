import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import CreateFormBlog from "./CreateBlogForm";

describe("Show name and author but no likes or url", () => {
  test("form calls event controller when creates a new Blog", () => {
    const createblog = jest.fn();
    const component = render(<CreateFormBlog createBlog={createblog} />);

    const titleInput = component.container.querySelector("#title");
    const authorInput = component.container.querySelector("#author");
    const urlInput = component.container.querySelector("#url");
    const form = component.container.querySelector(".submitForm");

    fireEvent.change(titleInput, { target: { value: "First class tests" } });
    fireEvent.change(authorInput, { target: { value: "Robert C. Martin" } });
    fireEvent.change(urlInput, {
      target: { value: "http://robertMartin.com" },
    });
    fireEvent.submit(form);

    expect(createblog).toHaveBeenCalledTimes(1);
    expect(createblog).toHaveBeenCalledWith({
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://robertMartin.com",
    });
  });
});
