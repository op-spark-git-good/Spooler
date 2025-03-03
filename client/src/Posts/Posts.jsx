import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post.jsx";

const Posts = () => {
  // fetched posts, updating state
  const [posts, setPosts] = useState([]);
  // new posts, updating form
  const [newPost, setNewPost] = useState({ title: "", content: "", author: "" });

  // fetching posts
  useEffect(() => {
    // GET request
    axios.get("/api/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("err fetching posts", error));
  }, []);

  // handling submit
  const handleSubmit = () => {
    // POST request
    axios.post("/api/posts", newPost)
      .then((response) => {
        // adding new post
        setPosts([response.data, ...posts]);
        setNewPost({ title: "", content: "", author: "" });
      })
      .catch((error) => console.error("err adding post", error));
  };

  return (
    <div style={styles.container}>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(event) => setNewPost({ ...newPost, title: event.target.value })}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Author"
          value={newPost.author}
          onChange={(event) => setNewPost({ ...newPost, author: event.target.value })}
          style={styles.input}
        />
        <textarea
          placeholder="Spool away.."
          value={newPost.content}
          onChange={(event) => setNewPost({ ...newPost, content: event.target.value })}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Post</button>
      </form>

      {posts.map((post) => (
        <Post key={post._id} title={post.title} content={post.content} author={post.author} />
      ))}
    </div>
  );
};

// styling
const styles = {
  
};

export default Posts;
