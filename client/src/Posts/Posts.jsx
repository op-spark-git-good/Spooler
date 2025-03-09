import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Avatar,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Posts = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedPost, setEditedPost] = useState({
    title: "",
    author: "",
    content: "",
  });

  // get user
  useEffect(() => {
    axios
      .get("/auth/current_user")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  // get posts/feed
  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => {
        const formPosts = res.data.map((post) => ({
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
    setEditedPost({
      title: post.title,
      author: post.author,
      content: post.content,
    });
  };

  // save edit
  const handleUpdate = async (postId) => {
    try {
      const response = await axios.put(`/api/posts/${postId}`, editedPost);
      setPosts(
        posts.map((post) => (post._id === postId ? response.data : post))
      );
      setEditingPostId(null);
    } catch (err) {
      console.error("err updating post", err);
    }
  };

  // like post
  const handleLike = async (postId) => {
    if (!user) return;
    try {
      const response = await axios.put(`/api/posts/${postId}/like`, {
        userId: user._id,
      });
      setPosts(
        posts.map((post) => (post._id === postId ? response.data : post))
      );
    } catch (err) {
      console.error("err liking post", err);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Community Feed
      </Typography>

      {/* post */}
      <Card sx={{ padding: 2, marginBottom: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Spool Away..."
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            value={content}
            onChange={(event) => setContent(event.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" fullWidth>
            Post
          </Button>
        </form>
      </Card>

      {/* feed */}
      {posts.map((item) => (
        <Card key={item._id} sx={{ marginBottom: 2 }}>
          <CardContent>
            {/* user */}
            <Box display="flex" alignItems="center" mb={1}>
              <Avatar sx={{ marginRight: 2 }}>
                {item.author ? item.author[0].toUpperCase() : "U"}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.author || "User"}{" "}
                  <Typography
                    variant="body2"
                    component="span"
                    color="textSecondary"
                  >
                    added a {item.type}
                  </Typography>
                </Typography>
                <Typography variant="caption" color="gray">
                  •{" "}
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "Invalid Date"}
                </Typography>
              </Box>
            </Box>

            {/* posts */}
            {item.type === "post" ? (
              <>
                {editingPostId === item._id ? (
                  <>
                    <TextField
                      fullWidth
                      label="Title"
                      value={editedPost.title}
                      onChange={(event) =>
                        setEditedPost({
                          ...editedPost,
                          title: event.target.value,
                        })
                      }
                      sx={{ marginBottom: 1 }}
                    />
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      label="Content"
                      value={editedPost.content}
                      onChange={(event) =>
                        setEditedPost({
                          ...editedPost,
                          content: event.target.value,
                        })
                      }
                      sx={{ marginBottom: 1 }}
                    />
                    <Button
                      onClick={() => handleUpdate(item._id)}
                      variant="contained"
                      size="small"
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="body1">{item.content}</Typography>
                  </>
                )}
              </>
            ) : (
              // patterns, notions, fabrics
              <>
                <Typography variant="h6">{item.name || "Unnamed"}</Typography>
                <Typography variant="body2">
                  Brand: {item.brand || "Unknown"}
                </Typography>
                {item.image && (
                  <img
                    src={item.image.startsWith("http") ? item.image : `http://localhost:8080/${item.image}`}
                    alt={item.name || "Unnamed"}
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      borderRadius: "8px",
                    }}
                    onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                  />
                )}
              </>
            )}
            {item.type === "post" && (
              <Box display="flex" justifyContent="space-between" mt={2}>
                <IconButton onClick={() => handleLike(item._id)}>
                  {item.likes.includes(user?._id) ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
                <Box>
                  <IconButton onClick={() => handleEdit(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default Posts;
