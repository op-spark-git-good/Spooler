import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid2,
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
  createTheme,
  ThemeProvider,


} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(31, 101, 66)', // Green color
    },
    secondary: {
      main: 'rgb(87, 27, 126)', // Purple color
    },
    background: {
      default: '#fff)', // Green color for the outside background
    },
    text: {
      primary: 'rgb(0, 0, 0)', // Black color
      secondary: 'rgb(106, 79, 12)', // Brown color
    },
  },
});

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
            resolve(result.info.secure_url); // Return the secure URL of the uploaded image
          } else {
            reject(error || 'Upload failed');
          }
        }
      );
    });
  };

  const handleImageUpload = async () => {
    try {
      const imageUrl = await openCloudinaryWidget(); // Get the image URL from Cloudinary
      setEditingPattern((prev) => ({
        ...prev,
        patternImage: imageUrl, // Store the image URL in the state
      }));
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
    <ThemeProvider theme={theme}>
      <Container style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh', padding: '20px' }}>

        <Typography variant="h3" align='center' gutterBottom style={{ color: 'rgb(31, 101, 66)' }}>
          Patterns
        </Typography>
        <Button
          component={Link}
          to="/create-pattern"
          variant="contained"
          sx={{
            backgroundColor: 'rgb(31, 101, 66)',
            color: 'rgb(229, 229, 234)',
            marginBottom: '20px',
            '&:hover': {
              backgroundColor: 'rgb(160, 132, 72)', // Darker gold on hover
            },
          }}
        >
          Create New Pattern
        </Button>

        <Grid2 container spacing={3}>
          {patterns.map((pattern) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={pattern._id}>
              <Card elevation={10} sx={{ backgroundColor: '#fff)' }}> {/* Gold color for the patterns */}
                {pattern.patternImage && (
                  <CardMedia
                    component="img"
                    alt={pattern.name}
                    height="200"
                    image={pattern.patternImage}
                  />

                )}
                <CardContent>
                  <Typography variant="h5">{pattern.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {pattern.description}
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
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditClick(pattern)}
                    style={{ marginRight: '10px', marginTop: '10px' }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(pattern._id)}
                    style={{ marginTop: '10px' }}
                  >
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>

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
              <Button
                variant="contained"
                onClick={handleImageUpload}
                style={{ marginTop: '10px' }}
              >
                Upload Pattern Image
              </Button>
              {editingPattern?.patternImage && (
                <img
                  src={editingPattern.patternImage}
                  alt="Pattern Preview"
                  style={{ maxWidth: '100px', height: 'auto', marginTop: '10px' }}
                />
              )}
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Container>
    </ThemeProvider >
  );
};

export default PatternList;