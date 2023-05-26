const mostLikes = require("../utils/list_helper").mostLikes;
const materials = require("../tests/test_materials");

const blog = {
  author: "Michael Chan",
  blogs: 7,
};

const blogs = {
  author: "Edsger W. Dijkstra",
  blogs: 17,
};

describe("mostLikes", () => {
  test("of empty list is zero", () => {
    expect(mostLikes(materials.noBlogs)).toBe(0);
  });
  test("of a bigger list is calculated right", () => {
    expect(mostLikes(materials.someBlogs)).toEqual(blogs);
  });
  test("when list has only one blog equals the likes of that", () => {
    expect(mostLikes(materials.OneBlog)).toEqual(blog);
  });
});
