const { _, groupBy, maxBy } = require("lodash");
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((accumulator, item) => {
    if (blogs.length === 0) {
      return 0;
    }
    return accumulator + item.likes;
  }, 0);

  return total;
};

const favoriteBlogs = (blogs) => {
  const favoriteBlog = blogs.reduce(
    (maxValue, item) => {
      if (item.likes > maxValue.likes) {
        return {
          title: item.title,
          author: item.author,
          likes: item.likes,
        };
      } else {
        return maxValue;
      }
    },
    { likes: 0 }
  );
  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else {
    const Author = groupBy(blogs, "author");
    const mostBlogs = maxBy(
      Object.keys(Author),
      (author) => Author[author].length
    );
    const maxBlogs = Author[mostBlogs].length;

    return { author: mostBlogs, blogs: maxBlogs };
  }
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  const mostLiked = _(blogs)
    .groupBy("author")
    .map((blogs, author) => ({ author, likes: _.sumBy(blogs, "likes") }))
    .maxBy("likes");

  return { author: mostLiked.author, blogs: mostLiked.likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
  mostBlogs,
  mostLikes,
};
