const favoriteBlogs = require("../utils/list_helper").favoriteBlogs;
const materials = require("../tests/test_materials");

const blog = {
  title: "React patterns",
  author: "Michael Chan",
  likes: 7,
};

const blogs = {
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  likes: 12,
};

describe("favoriteBlogs", () => {
  test("of empty list is zero", () => {
    expect(favoriteBlogs(materials.noBlogs)).toEqual({ likes: 0 });
  });
  test("of a bigger list is calculated right", () => {
    expect(favoriteBlogs(materials.someBlogs)).toEqual(blogs);
  });
  test("when list has only one blog equals the likes of that", () => {
    expect(favoriteBlogs(materials.OneBlog)).toEqual(blog);
  });
});
