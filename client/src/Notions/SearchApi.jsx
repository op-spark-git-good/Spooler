import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid2, TextField, Typography, Box } from '@mui/material';
const SearchApi = ({ getAllNotionsDB }) => {
  const [keyword, setSearchKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [info, setInfo] = useState([]);  // State to store info for the post request
  const navigate = useNavigate(); // Use the useNavigate hook for navigation
  const handleSearch = () => {
    if (!keyword) return; // Prevent unnecessary requests

    setLoading(true);
    setError(null);

    axios.get('/api/notions/search', { params: { query: keyword } })
      .then(response => {
        setResults(response.data.Data); // Ensure response structure is correct
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Something went wrong!');
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleAttributes = (title, image, color, brand, upc) => {
    const selectedItem = { title, image, color, brand, upc };

    setSelectedItems((prevItems) => {
      if (!prevItems.some(item => item.upc === upc)) {
        return [...prevItems, selectedItem];
      }
      return prevItems;
    });

    console.log('Sending POST request with selected item:', selectedItem);

    axios.post('/api/notions/', { item: selectedItem })
      .then(response => {
        console.log('Response from POST request:', response.data);

        if (response.data) {
          setInfo(response.data);

          // Navigate after state is updated
          navigate('/notion-form', {
            state: { title, image, color, brand, upc, info: response.data },
          });
        }
      })
      .catch(error => {
        console.error('Error adding Notion:', error);
        alert('Failed to add Notion!');
      });
  };




  return (
    <Container maxWidth="md">
      {/* Centered Search Box */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <TextField
          label="Enter search term"
          variant="outlined"
          value={keyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          sx={{ width: '100%', maxWidth: 400, mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </Box>

      {/* Display Error */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Search Results */}
      <Box mt={4}>
        {results.length > 0 ? (
          <ul style={{ textAlign: 'center' }}>
            {results.map((notion) => (
              <li key={notion.item_attributes.upc} style={{ marginBottom: '20px' }}>
                <Typography variant="h6">{notion.item_attributes.title}</Typography>
                <Typography>Brand: {notion.item_attributes.brand}</Typography>
                <Typography>Color: {notion.item_attributes.color}</Typography>
                <img
                  src={notion.item_attributes.image}
                  alt={notion.item_attributes.title}
                  style={{ width: '100px', height: 'auto', marginTop: '10px' }}
                />
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 1 }}
                  onClick={() =>
                    handleAttributes(
                      notion.item_attributes.title,
                      notion.item_attributes.image,
                      notion.item_attributes.color,
                      notion.item_attributes.brand,
                      notion.item_attributes.upc
                    )
                  }
                >
                  Edit Information
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <Typography align="center">No results found.</Typography>
        )}
      </Box>
    </Container>)
};
export default SearchApi;
