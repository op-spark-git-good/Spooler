import React, { useState, useEffect } from "react";
import axios from "axios";
// import Post from "./Post.jsx";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";


const Posts = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPost, setEditedPost] = useState({ title: "", author: "", content: "" });

  // get user
  useEffect(() => {
    axios.get("/auth/current_user")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // get posts/feed
  useEffect(() => {
    axios.get("/api/posts")
      .then((res) => {
        const formPosts = res.data.map(post => ({
          ...post,
          likes: Array.isArray(post.likes) ? post.likes : [],
        }));
        setPosts(formPosts);
      })
      .catch((err) => console.error("err fetching feed", err));
  }, []);


  // new post
  const handleSubmit = async () => {
    const newPost = { title, author: user.username, content };
    try {
      const response = await axios.post("/api/posts", newPost);
      setPosts([response.data, ...posts]);
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("err submitting post", err);
    }
  };

  // delete post
  const handleDelete = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("err deleting post", err);
    }
  };

   // edit post
   const handleEdit = (post) => {
    setEditingPostId(post._id);
    setEditedPost({ title: post.title, author: post.author, content: post.content });
  };

  // save edit
  const handleUpdate = async (postId) => {
    try {
      const response = await axios.put(`/api/posts/${postId}`, editedPost);
      setPosts(posts.map(post => post._id === postId ? response.data : post));
      setEditingPostId(null);
    } catch (err) {
      console.error("err updating post", err);
    }
  };

  // like post
const handleLike = async (postId) => {
  if (!user) return;
  try {
    const response = await axios.put(`/api/posts/${postId}/like`, { userId : user._id});
    setPosts(posts.map(post => post._id === postId ? response.data : post));
  } catch (err) {
    console.error("err liking post", err);
  }
};

  return (
    <div style={styles.container}>
      <h2>Community Feed</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          style={styles.input}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          style={styles.textarea}
          placeholder="Spool Away.."
        />
        <button type="submit" style={styles.button}>Post</button>
      </form>

      {posts.map((item) => (
        <div key={item._id} style={styles.post}>
          {item.type === "post" ? (
            // posts
            <>
              {editingPostId === item._id ? (
                <>
                  <input
                    type="text"
                    value={editedPost.title}
                    onChange={(event) => setEditedPost({ ...editedPost, title: event.target.value })}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    value={editedPost.author}
                    onChange={(event) => setEditedPost({ ...editedPost, author: event.target.value })}
                    style={styles.input}
                  />
                  <textarea
                    value={editedPost.content}
                    onChange={(event) => setEditedPost({ ...editedPost, content: event.target.value })}
                    style={styles.textarea}
                  />
                  <button onClick={() => handleUpdate(item._id)} style={styles.saveButton}>Save</button>
                </>
              ) : (
                <>
                  <h3>{item.title}</h3>
                  <p>{item.author}</p>
                  <p>{item.content}</p>
                  <button onClick={() => handleLike(item._id)} style={styles.likeButton}>
                    {item.likes.includes(user?._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />} {item.likes.length}
                  </button>
                  <button onClick={() => handleEdit(item)} style={styles.editButton}>Edit</button>
                  <button onClick={() => handleDelete(item._id)} style={styles.deleteButton}>Delete</button>
                </>
              )}
            </>
          ) : (
            // patterns, notions, fabrics
            <>
              <p><strong>{user?.username || "User"}</strong> added a {item.type}</p>
              <h3>{item.name || "Unnamed"}</h3>
              <p>Brand: {item.brand || "Unknown"}</p>
              {item.patternImage && <img src={item.patternImage} alt={item.name} style={styles.image} />}
            </>
          )}
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
  deleteButton: { padding: "6px", background: "grey", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", marginTop: "10px" },
  editButton: { padding: "6px", background: "white", color: "black", border: "1px solid grey", cursor: "pointer", borderRadius: "5px", marginRight: "5px" },
  saveButton: { padding: "6px", background: "green", color: "white", border: "none", cursor: "pointer", borderRadius: "5px", marginTop: "5px" },
};

export default Posts;
