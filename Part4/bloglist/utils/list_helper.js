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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs,
};
