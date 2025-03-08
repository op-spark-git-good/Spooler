import React from 'react';
import axios from 'axios';
import { Button, Typography, Box } from '@mui/material';

const Notion = ({ brand, color, image, title, id, getAllNotionsDB, length, quantity, colorNum }) => {
  const handleDelete = () => {
    axios.delete(`/api/notions/${id}`)
      .then(() => {
        getAllNotionsDB(); // Refresh the list after delete
      })
      .catch((err) => {
        console.error('Could not finish delete request:', err);
      });
  };

  return (
    <Box textAlign="center" p={2}>
      <Box display="flex" justifyContent="center">
        <img src={image} alt={title} style={{ width: '80px', height: 'auto' }} />
      </Box>

      <Typography variant="h6" fontWeight="bold">{title}</Typography>
      <Typography variant="body2" color="text.secondary">Brand: {brand}</Typography>
      <Typography variant="body2">Color: {color}</Typography>
      <Typography variant="body2">Quantity of Spools: {quantity}</Typography>
      <Typography variant="body2">Length of Thread: {length}</Typography>
      <Typography variant="body2">Color Number: {colorNum}</Typography>

      <Box mt={2} display="flex" justifyContent="center" gap={1}>
        <Button variant="contained" color="primary" size="small">Update</Button>
        <Button variant="contained" color="error" size="small" onClick={handleDelete}>Delete</Button>
      </Box>
    </Box>
  );
};

export default Notion;
