import { useState } from "react";

const Blog = ({ blog, buttonLabel, editLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='testName'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='showExtraInfo'>
        {blog.title} <button onClick={toggleVisibility}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        likes {blog.likes}{" "}
        <button onClick={editLikes} className='testLikes'>
          Like
        </button>
        <br></br>
        {blog.author}
        <button onClick={deleteBlog}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
