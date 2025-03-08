import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography, Box, TextField } from '@mui/material';

const SearchApi = ({ getAllNotionsDB }) => {
  const [keyword, setSearchKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!keyword) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('/api/notions/search', { params: { query: keyword } });
      setResults(response.data.Data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleAttributes = (title, image, color, brand, upc) => {
    navigate('/notion-form', {
      state: { title, image, color, brand, upc },
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
    </Container>
  );
};

export default SearchApi;
