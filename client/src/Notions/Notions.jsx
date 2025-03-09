import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Notion from './Notion.jsx';
import { Button, Container, Grid2, Typography, Paper, Box, } from '@mui/material';


const Notions = (props) => {
  const [notions, setNotions] = useState([]);
  const [loading, setLoading] = useState(true); // To manage loading state
  let navigate = useNavigate();

  // Function to fetch all notions from the backend
  const getAllNotionsDB = () => {
    axios.get('/api/notions')
      .then((response) => {
        setNotions(response.data); // Update the state with the fetched notions
        setLoading(false); // Set loading to false when the data is fetched
      })
      .catch((err) => {
        console.error('Error fetching notions:', err);
        setLoading(false); // Stop loading even if there was an error
      });
  };

  useEffect(() => {
    // Fetch all notions when the component mounts
    getAllNotionsDB();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" align='center' color='rgb(31, 101, 66)' gutterBottom>Notion Stash</Typography>

      <Box mb={2}>
        <Button
          sx={{
            backgroundColor: 'rgb(31, 101, 66)',
            color: 'rgb(229, 229, 234)',
            marginBottom: '20px',
            '&:hover': {
              backgroundColor: 'rgb(160, 132, 72)', // Darker gold on hover
              color: '#fff'
            },
          }}

          onClick={() => navigate('/notions-searchApi')}
        >
          Create Notion
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>

        </Box>
      ) : notions.length > 0 ? (
        <Grid2 container spacing={3}>
          {notions.map((notion) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={notion._id}>
              <Paper elevation={16} sx={{ borderRadius: 2 }}>
                <Notion
                  title={notion.title}
                  brand={notion.brand}
                  color={notion.color}
                  image={notion.image}
                  upc={notion.upc}
                  id={notion._id}
                  length={notion.length}
                  quantity={notion.quantity}
                  colorNum={notion.colorNum}
                  getAllNotionsDB={getAllNotionsDB}
                />
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography>No notions found.</Typography>
      )}
    </Container>
  );
};

export default Notions;