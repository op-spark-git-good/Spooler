import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post.jsx";

const Posts = () => {
  // fetched posts, updating state
  const [posts, setPosts] = useState([]);
  // new posts, updating form
  // const [newPost, setNewPost] = useState({ title: "", content: "", author: "" });
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  // fetching posts
  useEffect(() => {
    // GET request
    axios.get("/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("err fetching posts", err));
  }, []);


    // handling submit
  const handleSubmit = async () => {
    const newPost = { title, author, content };
    try {
      // POST request
      const response = await axios.post("/api/posts", newPost);
      setPosts([response.data, ...posts]);
      setTitle("");
      setAuthor("");
      setContent("");
    } catch (err) {
      console.error("err submitting post", err);
    }
  };

  // handling delete
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("err deleting post", err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Posts</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          style={styles.input}
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Post</button>
      </form>

      {posts.map((post) => (
        <div key={post._id} style={styles.post}>
          <h3>{post.title}</h3>
          <p>{post.author}</p>
          <p>{post.content}</p>
          <button onClick={() => handleDelete(post._id)} style={styles.deleteButton}>Delete</button>
        </div>
      ))}
    </div>
  );
};

// styling
const styles = {
    container: { maxWidth: "600px", margin: "auto", padding: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" },
  input: { padding: "10px", fontSize: "16px", width: "100%", border: "1px solid #ccc", borderRadius: "5px" },
  textarea: { padding: "10px", fontSize: "16px", height: "100px", width: "100%", border: "1px solid #ccc", borderRadius: "5px" },
  button: { padding: "10px", background: "#333", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" },
  post: { border: "1px solid #ddd", padding: "15px", borderRadius: "5px", marginBottom: "10px", backgroundColor: "#f9f9f9" },
  deleteButton: { padding: "8px", background: "grey", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", marginTop: "10px" },
};

export default Posts;
