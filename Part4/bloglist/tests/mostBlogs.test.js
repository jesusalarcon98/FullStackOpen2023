const mostBlogs = require("../utils/list_helper").mostBlogs;
const materials = require("../tests/test_materials");

const blog = {
  author: "Michael Chan",
  blogs: 1,
};

const blogs = {
  author: "Robert C. Martin",
  blogs: 3,
};

describe("mostBlogs", () => {
  test("of empty list is zero", () => {
    expect(mostBlogs(materials.noBlogs)).toBe(0);
  });
  test("of a bigger list is calculated right", () => {
    expect(mostBlogs(materials.someBlogs)).toEqual(blogs);
  });
  test("when list has only one blog equals the likes of that", () => {
    expect(mostBlogs(materials.OneBlog)).toEqual(blog);
  });
});
