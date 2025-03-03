import React from "react";
import Post from "./Post.jsx";

const Posts = () => {
  return (
    <div>
      <h1>Posts</h1>
      <Post title="Testing Post" content="Post content" author="Author" />
    </div>
  );
};

export default Posts;
