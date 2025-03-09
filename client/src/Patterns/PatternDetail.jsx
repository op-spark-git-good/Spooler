import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';

// Define your custom theme with the provided colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#fff)', // Green color
    },
    secondary: {
      main: 'rgb(87, 27, 126)', // Purple color
    },
    background: {
      default: 'rgb(229, 229, 234)', // Green color for the outside background
    },
    text: {
      primary: 'rgb(0, 0, 0)', // Black color
      secondary: 'rgb(106, 79, 12)', // Brown color
    },
  },
});

const PatternDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    patternImage: '',
    fabricType: 'woven',
    notions: '',
    size: '',
    difficultyLevel: 'beginner',
    designer: '',
    brand: '',
    format: 'pdf',
  });

  useEffect(() => {
    const fetchPattern = async () => {
      try {
        const response = await axios.get(`/api/patterns/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching pattern:', error);
      }
    };

    fetchPattern();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/patterns/${id}`, formData);
      navigate('/patterns'); // Redirect to the patterns list after update
    } catch (error) {
      console.error('Error updating pattern:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="md"
        style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh', padding: '20px' }}
      >
        <Typography variant="h4" gutterBottom style={{ color: '#ffffff' }}>
          Edit Pattern
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: '#ffffff' } }}
                InputProps={{ style: { color: '#ffffff' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
                InputLabelProps={{ style: { color: '#ffffff' } }}
                InputProps={{ style: { color: '#ffffff' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pattern Image URL"
                name="patternImage"
                value={formData.patternImage}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: '#ffffff' } }}
                InputProps={{ style: { color: '#ffffff' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel style={{ color: '#ffffff' }}>Fabric Type</InputLabel>
                <Select
                  name="fabricType"
                  value={formData.fabricType}
                  onChange={handleChange}
                  label="Fabric Type"
                  style={{ color: '#ffffff' }}
                >
                  <MenuItem value="woven">Woven</MenuItem>
                  <MenuItem value="stretched">Stretched</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Notions (comma-separated)"
                name="notions"
                value={formData.notions}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: '#ffffff' } }}
                InputProps={{ style: { color: '#ffffff' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Size Range"
                name="size"
                value={formData.size}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: '#ffffff' } }}
                InputProps={{ style: { color: '#ffffff' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel style={{ color: '#ffffff' }}>Difficulty Level</InputLabel>
                <Select
                  name="difficultyLevel"
                  value={formData.difficultyLevel}
                  onChange={handleChange}
                  label="Difficulty Level"
                  style={{ color: '#ffffff' }}
                >
                  <MenuItem value="beginner">Beginner</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="advanced">Advanced</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Designer"
                name="designer"
                value={formData.designer}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: '#ffffff' } }}
                InputProps={{ style: { color: '#ffffff' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                InputLabelProps={{ style: { color: '#ffffff' } }}
                InputProps={{ style: { color: '#ffffff' } }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel style={{ color: '#ffffff' }}>Format</InputLabel>
                <Select
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  label="Format"
                  style={{ color: '#ffffff' }}
                >
                  <MenuItem value="pdf">PDF</MenuItem>
                  <MenuItem value="paper">Paper</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: 'rgb(182, 152, 82)', // Gold color
                  color: '#000000', // Black text for contrast
                  '&:hover': {
                    backgroundColor: 'rgb(160, 132, 72)', // Darker gold on hover
                  },
                }}
              >
                Update Pattern
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default PatternDetail;