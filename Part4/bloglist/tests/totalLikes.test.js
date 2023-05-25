const totalLikes = require("../utils/list_helper").totalLikes;
const materials = require("../tests/test_materials");

describe("totalLikes", () => {
  test("of empty list is zero", () => {
    expect(totalLikes(materials.noBlogs)).toBe(0);
  });
  test("when list has only one blog equals the likes of that", () => {
    expect(totalLikes(materials.OneBlog)).toBe(7);
  });
  test("of a bigger list is calculated right", () => {
    expect(totalLikes(materials.someBlogs)).toBe(36);
  });
});
