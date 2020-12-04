const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const max = blogs.reduce(function (prev, current) {
    return prev.likes > current.likes ? prev : current;
  });
  return max;
};

const mostBlogs = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, "author");
  const sortedBlogs = Object.keys(groupedBlogs)
    .map((author) => {
      return { author, blogs: groupedBlogs[author] };
    })
    .sort((a, b) => {
      return b.blogs.length - a.blogs.length;
    });
  return { author: sortedBlogs[0].author, blogs: sortedBlogs[0].blogs.length };
};

const mostLikes = (blogs) => {
  const groupedBlogs = _.groupBy(blogs, "author");
  const sortedBlogs = Object.keys(groupedBlogs)
    .map((author) => {
      return { author, likes: totalLikes(groupedBlogs[author]) };
    })
    .sort((a, b) => {
      return b.likes - a.likes;
    });

  return { author: sortedBlogs[0].author, likes: sortedBlogs[0].likes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
