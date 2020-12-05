import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders blog", () => {
  const blog = {
    title: "Title testing",
    author: "Author testing",
    url: "wow",
    like: 12,
    user: {
      name: "tanapol",
    },
  };

  const component = render(<Blog blog={blog} />);

  const div = component.container.querySelector(".blog");

  expect(div).toHaveTextContent("Title testing by Author testing");
  expect(div).not.toHaveTextContent("wow");
  //expect(component.container).not.toHaveTextContent("test");
});

test("clicking the button show url and like", () => {
  const blog = {
    title: "Title testing",
    author: "Author testing",
    url: "wow",
    like: 12,
    user: {
      name: "tanapol",
    },
  };

  const component = render(<Blog blog={blog} />);

  const button = component.getByText("view");
  fireEvent.click(button);

  const div = component.container.querySelector(".hiddenBlog");
  expect(div).toHaveTextContent("wow");
  expect(div).toHaveTextContent("like");
});
