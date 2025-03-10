import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Box,
} from '@mui/material';

const PatternList = () => {
  const [patterns, setPatterns] = useState([]);
  const [editingPattern, setEditingPattern] = useState(null);
  const [cloudinaryLoaded, setCloudinaryLoaded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    script.onload = () => {
      setCloudinaryLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Cloudinary widget script');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openCloudinaryWidget = () => {
    return new Promise((resolve, reject) => {
      if (
        !cloudinaryLoaded ||
        !window.cloudinary ||
        !window.cloudinary.openUploadWidget
      ) {
        reject(new Error('Cloudinary widget not available'));
        return;
      }

      window.cloudinary.openUploadWidget(
        {
          cloudName: 'djfvmivqq',
          uploadPreset: 'ml_default',
          sources: ['local', 'url'],
          multiple: false,
        },
        (error, result) => {
          if (!error && result && result.event === 'success') {
            resolve(result.info.secure_url);
          } else {
            reject(error || 'Upload failed');
          }
        }
      );
    });
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data && response.data.imageUrl) {
        setEditingPattern((prev) => ({
          ...prev,
          patternImage: response.data.imageUrl,
        }));
      } else {
        console.error('Error: Image URL not found in response.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleEditClick = (pattern) => {
    setEditingPattern({
      ...pattern,
      notions: pattern.notions || [],
    });
    setOpenDialog(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!editingPattern || !editingPattern._id) {
      console.error('Error: No pattern selected for editing!');
      return;
    }

    try {
      const response = await axios.put(
        `/api/patterns/${editingPattern._id}`,
        editingPattern
      );
      setPatterns((prevPatterns) =>
        prevPatterns.map((pattern) =>
          pattern._id === editingPattern._id ? response.data : pattern
        )
      );
      setOpenDialog(false);
    } catch (error) {
      console.error('Error updating pattern:', error);
    }
  };

  useEffect(() => {
    const fetchPatterns = async () => {
      try {
        const response = await axios.get('/api/patterns');
        setPatterns(response.data);
      } catch (error) {
        console.error('Error fetching patterns:', error);
      }
    };

    fetchPatterns();
  }, []);

  const handleDelete = (id) => {
    if (!id) {
      console.error('Error: ID is undefined!');
      return;
    }

    axios
      .delete(`/api/patterns/${id}`)
      .then(() => {
        setPatterns((prevPatterns) =>
          prevPatterns.filter((pattern) => pattern._id !== id)
        );
      })
      .catch((error) => console.error('Error deleting pattern:', error));
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom style={{ color: 'rgb(31, 101, 66)' }}>
        Patterns
      </Typography>
      <Box display="flex" justifyContent="center" mb={4}>
        <Button
          component={Link}
          to="/create-pattern"
          variant="contained"
          sx={{
            backgroundColor: 'rgb(31, 101, 66)',
            color: 'rgb(229, 229, 234)',
            '&:hover': {
              backgroundColor: 'rgb(20, 80, 50)',
            },
          }}
        >
          Create New Pattern
        </Button>
      </Box>

      <Grid container spacing={3}>
        {patterns.map((pattern) => (
          <Grid item xs={12} sm={6} md={4} key={pattern._id}>
            <Card
              sx={{
                textAlign: 'center',
                p: 2,
                boxShadow: 2,
                borderRadius: 2,
                border: 1,
                borderColor: 'grey.300',
              }}
            >
              {pattern.patternImage && (
                <CardMedia
                  component="img"
                  alt={pattern.name}
                  height="200"
                  image={pattern.patternImage}
                  sx={{ borderRadius: 2 }}
                />
              )}
              <CardContent>
                <Typography variant="h6" align="center" fontWeight="bold">
                  {pattern.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Description:</strong> {pattern.description}
                </Typography>
                <Typography variant="body2">
                  <strong>Fabric Type:</strong> {pattern.fabricType}
                </Typography>
                <Typography variant="body2">
                  <strong>Notions:</strong> {pattern.notions.join(', ')}
                </Typography>
                <Typography variant="body2">
                  <strong>Size:</strong> {pattern.size}
                </Typography>
                <Typography variant="body2">
                  <strong>Difficulty:</strong> {pattern.difficultyLevel}
                </Typography>
                <Typography variant="body2">
                  <strong>Designer:</strong> {pattern.designer}
                </Typography>
                <Typography variant="body2">
                  <strong>Brand:</strong> {pattern.brand}
                </Typography>
                <Typography variant="body2">
                  <strong>Format:</strong> {pattern.format}
                </Typography>
                <Box mt={2} display="flex" justifyContent="center" gap={1}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'rgb(31, 101, 66)',
                      color: 'rgb(229, 229, 234)',
                      '&:hover': {
                        backgroundColor: 'rgb(20, 80, 50)',
                      },
                    }}
                    onClick={() => handleEditClick(pattern)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'rgb(229, 229, 234)',
                      color: 'rgb(87, 27, 126)',
                      '&:hover': {
                        backgroundColor: 'rgb(200, 200, 200)',
                      },
                    }}
                    onClick={() => handleDelete(pattern._id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Pattern</DialogTitle>
        <DialogContent>
          <form onSubmit={handleUpdateSubmit}>
            <TextField
              fullWidth
              label="Name"
              value={editingPattern?.name || ''}
              onChange={(e) =>
                setEditingPattern({
                  ...editingPattern,
                  name: e.target.value,
                })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              value={editingPattern?.description || ''}
              onChange={(e) =>
                setEditingPattern({
                  ...editingPattern,
                  description: e.target.value,
                })
              }
              multiline
              rows={4}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Fabric Type"
              value={editingPattern?.fabricType || ''}
              onChange={(e) =>
                setEditingPattern({
                  ...editingPattern,
                  fabricType: e.target.value,
                })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Notions (comma-separated)"
              value={editingPattern?.notions?.join(', ') || ''}
              onChange={(e) =>
                setEditingPattern({
                  ...editingPattern,
                  notions: e.target.value.split(',').map((item) => item.trim()),
                })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Size"
              value={editingPattern?.size || ''}
              onChange={(e) =>
                setEditingPattern({ ...editingPattern, size: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Difficulty Level"
              value={editingPattern?.difficultyLevel || ''}
              onChange={(e) =>
                setEditingPattern({
                  ...editingPattern,
                  difficultyLevel: e.target.value,
                })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Designer"
              value={editingPattern?.designer || ''}
              onChange={(e) =>
                setEditingPattern({
                  ...editingPattern,
                  designer: e.target.value,
                })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Brand"
              value={editingPattern?.brand || ''}
              onChange={(e) =>
                setEditingPattern({ ...editingPattern, brand: e.target.value })
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Format"
              value={editingPattern?.format || ''}
              onChange={(e) =>
                setEditingPattern({ ...editingPattern, format: e.target.value })
              }
              margin="normal"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="upload-image"
            />
            <label htmlFor="upload-image">
              <Button
                variant="contained"
                component="span"
                sx={{
                  backgroundColor: 'rgb(31, 101, 66)',
                  color: 'rgb(229, 229, 234)',
                  '&:hover': {
                    backgroundColor: 'rgb(20, 80, 50)',
                  },
                }}
                style={{ marginTop: '10px' }}
              >
                Upload Pattern Image
              </Button>
            </label>
            {editingPattern?.patternImage && (
              <img
                src={editingPattern.patternImage}
                alt="Pattern Preview"
                style={{ maxWidth: '100px', height: 'auto', marginTop: '10px' }}
              />
            )}
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: 'rgb(31, 101, 66)',
                  color: 'rgb(229, 229, 234)',
                  '&:hover': {
                    backgroundColor: 'rgb(20, 80, 50)',
                  },
                }}
              >
                Save Changes
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default PatternList;