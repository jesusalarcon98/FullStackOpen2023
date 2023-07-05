import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

describe("Show name and author but no likes or url", () => {
  const blog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://robertMartin.com",
    likes: 0,
  };
  const component = render(<Blog blog={blog} />);

  test("Render title and author", () => {
    const divTest = component.container.querySelector(".testName");
    expect(divTest).toHaveTextContent("First class tests Robert C. Martin");
    expect(divTest).not.toHaveTextContent("http://robertMartin.com");
    expect(divTest).not.toHaveTextContent("0");
  });
});
