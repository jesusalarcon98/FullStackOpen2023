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

module.exports = {
  dummy,
  totalLikes,
};
