/*
Realice una prueba que verifique que la URL del blog y el número de likes se muestran cuando se hace clic en el botón que controla los detalles mostrados.

 */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
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

  test("URL and likes are shown clicking the button", () => {
    const blog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://robertMartin.com",
      likes: 0,
    };

    const component = render(<Blog blog={blog} buttonLabel='View' />);

    const buttonShowMore = component.getByText("View");
    fireEvent.click(buttonShowMore);

    const divTest = component.container.querySelector(".showExtraInfo");

    expect(divTest).toHaveTextContent("http://robertMartin.com");
    expect(divTest).toHaveTextContent("likes 0");
    component.debug();
  });
});
